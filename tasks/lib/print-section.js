'use strict';

var debug = require('debug')('changelog:printSection');
var format = require('util').format;

function printCommit(stream, printCommitLinks, prefix, commit) {
  stream.write(format('%s %s\n', prefix, commit.subject));

  if (printCommitLinks) {
    var links = [];

    if (this.links.commit) {
      links.push(this.linkToCommit(commit.hash));
    }  
    
    if (this.links.issue && commit.closes.length) {
      links.push.apply(links, commit.closes.map(this.linkToIssue, this));
    }

    if (links.length) {
      stream.write('(' + links.join(', ') + ')\n');
    }
  }
}

function printComponent(stream, section, printCommitLinks, name) {
  var prefix = '-';
  var nested = section[name].length > 1;

  if (name !== this.emptyComponent) {
    if (nested) {
      stream.write(format('- **%s:**\n', name));
      prefix = '  -';
    } else {
      prefix = format('- **%s:**', name);
    }
  }

  section[name].forEach(printCommit.bind(this, stream, printCommitLinks, prefix), this);
}

function printSection(stream, title, section, printCommitLinks) {
  debug('printing section ...');
  printCommitLinks = printCommitLinks === undefined ? true : printCommitLinks;
  var components = Object.keys(section).sort();

  if (!components.length) {
    return;
  }

  stream.write(format('\n## %s\n\n', title));

  components.forEach(printComponent.bind(this, stream, section, printCommitLinks), this);

  stream.write('\n');
}

module.exports = printSection;

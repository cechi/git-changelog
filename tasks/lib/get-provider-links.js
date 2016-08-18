'use strict';

var debug = require('debug')('changelog:getProviderLinks');

function getProviderLinks() {
  debug('getting provider links');
  // This is just in case they differ their urls at some point in the future.
  // Also brings the posibility of adding more providers
  var providerLinks = {
    github: {
      issue: '[#%s](' + this.options.repo_url + '/issues/%s)',
      commit: '[%s](' + this.options.repo_url + '/commit/%s)'
    },
    bitbucket: {
      issue: '[#%s](' + this.options.repo_url + '/issues/%s)',
      commit: '[%s](' + this.options.repo_url + '/commits/%s)'
    },
    custom: {}
  };

  providerLinks.custom.issue = this.options.issue_url ? '[#%s](' + this.options.issue_url + ')' : null;
  providerLinks.custom.commit = this.options.commit_url ? '[#%s](' + this.options.commit_url + ')' : null;
  
  if (this.options.repo_url.indexOf('github.com') !== -1) {
    this.provider = 'github';
  } else if (this.options.repo_url.indexOf('bitbucket.org') !== -1) {
    this.provider = 'bitbucket';
  } else {
    this.provider = 'custom';    
  }

  this.links = providerLinks[this.provider];
}

module.exports = getProviderLinks;

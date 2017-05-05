'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$mdToast', 'profileService', 'wayService', 'reviewService', 'profile', 'ways', HomeController]; //TODO: Add service dependencies

function HomeController($log, $rootScope, $mdToast, profileService, wayService, reviewService, profile, ways) {
  $log.debug('HomeContoller');

  this.profile = profile;
  this.ways = ways;

  $log.debug('$$$ home control profile', profile);
  this.fetchProfile = function() {
    profileService.fetchProfile()
    .then( profile => {
      this.profile = profile;
      $mdToast.showSimple(`Welcome to ways2go, ${profile.displayName}`);
      return profile;
    })
    .catch( err => $mdToast.showSimple(err.data));
  };
  $log.debug('++home this++', this);
}

'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$mdToast', 'profileService', 'wayService', HomeController]; //TODO: Add service dependencies

function HomeController($log, $rootScope, $mdToast, profileService, wayService ) {
  $log.debug('HomeContoller');

  // this.profile = {};
  wayService.fetchWays()
  .then( ways => {
    $log.log('ways fetched on home view');
  })

  this.fetchProfile = function() {
    profileService.fetchProfile()
    .then( profile => {
      this.profile = profile;
      $log.debug(this.profile.fullName);
      $mdToast.showSimple(`Welcome to ways2go, ${profile.displayName}`);
    })
    .catch( err => $mdToast.showSimple(err.data));
  };

  this.fetchProfile();
  $rootScope.$on('$locationChangeSuccess', () => {
  });
}

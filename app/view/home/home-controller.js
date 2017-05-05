'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$mdToast', 'profileService', 'wayService', 'reviewService','profile', HomeController]; //TODO: Add service dependencies

function HomeController($log, $rootScope, $mdToast, profileService, wayService, reviewService, profile) {
  $log.debug('HomeContoller');

  this.profile = profile;
  // this.$onInit = () => {
  //   this.fetchProfile();
  //   wayService.fetchWays();
  // };
  // this.profile = {};
  // wayService.fetchWays()
  // .then( ways => {
  //   $log.log('ways fetched on home view');
  // })
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
  // this.fetchProfile();
  // $rootScope.$on('$locationChangeSuccess', () => {
  // });
}

'use strict';

require('./_home.scss');

module.exports = ['$log', '$mdToast', 'profileService', HomeController]; //TODO: Add service dependencies

function HomeController($log, $mdToast, profileService) {
  $log.debug('HomeContoller');

  this.profile = {};

  this.fetchProfile = function() {
    $log.debug('HomeController.fetchProfile');

    profileService.fetchProfile()
    .then( profile => {
      this.profile = profile;
      $mdToast.showSimple(`Welcome back to ways2go, ${profile.displayname}`);
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
    });
  };

  //TODO: Home View Controller
}

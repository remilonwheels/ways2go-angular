'use strict';

require('./_create-profile.js');

module.exports = {
  template: require('./create-profile.html'),
  controller: ['$log', '$window', '$location', '$mdDialog', '$mdToast', 'profileService', CreateProfileController],
  controllerAs: 'createProfileCtrl'
};

function CreateProfileController($log, $window, $location, $mdDialog, $mdToast, profileService) {
  $log.debug('CreateProfileController');

  this.isLoading = false;
  this.profile = {};

  this.createProfile = function() {
    $log.debug('CreateProfileController.createProfile');

    this.isLoading = true;
    profileService.createProfile(this.profile)
    .then( () => {
      $mdToast.showSimple('Thanks for creating your profile!');
      this.isLoading = false;
      $mdDialog.hide();
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = true;
    });
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

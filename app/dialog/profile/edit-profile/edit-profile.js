'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', '$window', '$location', '$mdDialog', '$mdToast', 'profileService', EditProfileController],
  controllerAs: 'editProfileCtrl'
};

function EditProfileController($log, $window, $location, $mdDialog, $mdToast, profileService) {
  $log.debug('EditProfileController');

  this.isLoading = false;
  this.profile = {};

  this.updateProfile = function() {
    $log.debug('EditProfileController.updateProfile');

    this.isLoading = true;
    profileService.updateProfile(this.profile)
    .then( () => {
      $mdToast.showSimple('Your profile has been updated.');
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

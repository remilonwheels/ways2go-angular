'use strict';

require('./_create-profile.js');

module.exports = {
  template: require('./create-profile.html'),
  controller: ['$log', '$window', '$location', '$mdDialog', 'profileService', 'items', CreateProfileController],
  controllerAs: 'createProfileCtrl'
};

function CreateProfileController($log, $window, $location, $mdDialog, profileService, items) {
  $log.debug('CreateProfileController');

  this.isLoading = false;
  this.profile = {};
  $log.log('this.profile', 'this.profile');
  this.items = items;
  $log.log('this.items', this.items);

  this.createProfile = function() {
    $log.debug('CreateProfileController.createProfile');

    this.isLoading = true;
    profileService.createProfile(this.profile)
    .then( profile => {
      this.isLoading = false;
      $log.log('profile', profile);
    })
    .catch( err => {
      $log.error('Profile creation error', err);
    });
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

'use strict';

require('./_create-profile.scss');

module.exports = {
  template: require('./create-profile.html'),
  controller: ['$log', '$window', '$location', '$mdDialog', '$mdToast', 'profileService', CreateProfileController],
  controllerAs: 'createProfileCtrl'
};

function CreateProfileController($log, $window, $location, $mdDialog, $mdToast, profileService) {
  $log.debug('CreateProfileController');

  this.isLoading = false;
  this.profile = {};

  $log.debug('isLoading outside createProfile', this.isLoading);
  $log.debug('this outside', this);
  this.createProfile = function() {
    $log.debug('CreateProfileController.createProfile');

    this.isLoading = true;
    $log.debug('isLoading in createProfile', this.isLoading);
    $log.debug('this inside', this);

    profileService.createProfile(this.profile)
    .then( () => {
      $mdToast.showSimple('Thanks for creating your profile!')
      .then( () => {

        this.isLoading = false;
        $log.debug('isLoading in toast then', this.isLoading);
        $location.url('/home');
        $mdDialog.hide();
      });
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = false;
    });
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

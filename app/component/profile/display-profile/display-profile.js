'use strict';

require('./_display-profile.scss');

const editProfileComponent = require('../../../dialog/profile/edit-profile/edit-profile.js');

module.exports = {
  template: require('./display-profile.html'),
  controller: ['$log', '$mdToast', '$mdSidenav', '$rootScope', '$scope', '$mdMedia', '$mdDialog', '$location', 'profileService', DisplayProfileController],
  controllerAs: 'displayProfileCtrl',
  bindings: {
    profile: '<'
  }
};

function DisplayProfileController($log, $mdToast, $mdSidenav, $rootScope, $scope, $mdMedia, $mdDialog, $location, profileService) {
  $log.debug('DisplayProfileController');

  this.editProfile = function(bindFlag) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      scope: $scope.$new(bindFlag)
    };

    $mdDialog.show(Object.assign(editProfileComponent, dialogConfig));
  };

  this.deleteProfile = function() {
    $log.debug('DisplayProfileController.deleteProfile');

    this.isLoading = true;

    profileService.deleteProfile()
    .then( () => {
      $mdToast.showSimple('profile deleted')
      .then( () => {
        $location.url('/join');
        $mdDialog.hide();
      });
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
    });
  };

  this.closeProfile = function() {
    $mdSidenav('left').close();
  };

  this.isOpen = false;
}

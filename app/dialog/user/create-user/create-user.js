'use strict';

require('./_create-user.scss');

const createProfileComponent = require('../../profile/create-profile/create-profile.js');

module.exports = {
  template: require('./create-user.html'),
  controller: ['$log', '$window', '$location', '$mdDialog','$mdToast', '$scope', '$mdMedia', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $window, $location, $mdDialog, $mdToast, $scope, $mdMedia, authService) {
  $log.debug('SignupController');

  this.isLoading = false;
  this.isAuthorized = false;
  this.user = {};

  if ($window.token) {
    authService.getToken()
    .then( () => {
      $location.url('/home');
    });
  }

  this.createUser = function() {
    $log.debug('SignupController.createUser');

    this.isLoading = true;
    authService.signup(this.user)
    .then( () => {
      $mdToast.showSimple('Welcome to ways2go! Please create a profile...');
      this.isLoading = false;
      this.isAuthorized = true;
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = false;
    });
  };

  this.createProfile = function(bindFlag) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      scope: $scope.$new(bindFlag)
    };

    $mdDialog.show(Object.assign(createProfileComponent, dialogConfig));
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

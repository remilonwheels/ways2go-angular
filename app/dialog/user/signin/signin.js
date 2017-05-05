'use strict';

require('./_signin.scss');

const updateUserComponent = require('../edit-user/edit-user.js');

module.exports = {
  template: require('./signin.html'),
  controller: ['$log', '$window', '$location', '$mdDialog', '$mdToast', '$scope', '$mdMedia', 'authService', SigninController],
  controllerAs: 'signinCtrl'
};

function SigninController($log, $window, $location, $mdDialog, $mdToast, $scope, $mdMedia, authService) {
  $log.debug('SigninController');

  this.isLoading = false;
  this.isAuthorized = false;
  this.user = {};
  this.rating = 3;

  if ($window.token) {
    authService.getToken()
    .then( () => {
      $location.url('/home');
    });
  }

  this.signinUser = function() {
    $log.debug('SigninController.singin');

    this.isLoading = true;
    authService.login(this.user)
    .then( () => {
      $mdToast.showSimple(`Welcome back ${this.user.username}`);
      this.isLoading = false;
      this.isAuthorized = true;
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = false;
    });
  };

  this.updateUser = function($event, bindFlag) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      scope: $scope.$new(bindFlag)
    };
    $mdDialog.show(Object.assign(updateUserComponent, dialogConfig));
  };

  this.deleteUser = function() {
    $log.debug('SigninController.deleteUser');

    this.isLoading = true;

    authService.deleteUser()
    .then( () => {
      $mdToast.showSimple('user account info removed')
      .then( () => {
        $location.url('/join');
        $mdDialog.hide();
      });
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
    });
  };

  this.goHome = function() {
    $location.url('/home');
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

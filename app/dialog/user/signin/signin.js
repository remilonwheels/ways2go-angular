'use strict';

require('./_signin.scss');

module.exports = {
  template: require('./signin.html'),
  controller: ['$log', '$window', '$location', '$mdDialog', '$mdToast', 'authService', SigninController],
  controllerAs: 'signinCtrl'
};

function SigninController($log, $window, $location, $mdDialog, $mdToast, authService) {
  $log.debug('SigninController');

  this.isLoading = false;
  this.isAuthorized = false;
  this.user = {};

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

  this.goHome = function() {
    $location.url('/home');
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

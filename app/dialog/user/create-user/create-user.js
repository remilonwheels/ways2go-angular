'use strict';

require('./_create-user.scss');

module.exports = {
  template: require('./create-user.html'),
  controller: ['$log', '$window', '$location', '$mdDialog','$mdToast', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $window, $location, $mdDialog, $mdToast, authService) {
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
    $log.debug('SignupController.signup');

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

  this.goHome = function() {
    $location.url('/home');
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

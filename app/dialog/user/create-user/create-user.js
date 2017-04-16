'use strict';

require('./_create-user.scss');

module.exports = {
  template: require('./create-user.html'),
  controller: ['$log', '$window', '$location', '$mdDialog', 'authService', 'items', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $window, $location, $mdDialog, authService, items) {
  $log.debug('SignupController');

  this.isLoading = false;
  this.isAuthorized = false;
  this.user = {};
  this.items = items;
  $log.log(this.items);

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
      this.isLoading = false;
      this.isAuthorized = true;
      // $location.url('/home');
    })
    .catch( err => {
      $log.error('Signup Error', err);
    });
  };
  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

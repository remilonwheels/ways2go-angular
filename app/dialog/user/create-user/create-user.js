'use strict';

require('./_create-user.scss');

module.exports = {
  template: require('./create-user.html'),
  controller: ['$log', '$window', '$location', '$mdDialog','$mdToast', 'authService', 'items', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $window, $location, $mdDialog, $mdToast, authService, items) {
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
      $mdToast.showSimple('Welcome to ways2go! Please create a profile...');
      this.isLoading = false;
      this.isAuthorized = true;
      // $location.url('/home');
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

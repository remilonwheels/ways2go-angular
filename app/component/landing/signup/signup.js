'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', '$window', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, $window, authService) {
  $log.debug('SignupController');

  if ($window.token) {
    authService.getToken()
    .then( () => {
      $location.url('/home');
    });
  }
  
  this.signup = function(user) {
    $log.debug('SignupController.signup');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  };
}

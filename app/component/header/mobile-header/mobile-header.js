'use strict';

require('./_mobile-header.scss');

module.exports = {
  template: require('./mobile-header.html'),
  controller: ['$log', '$http', '$location', '$mdToast', '$rootScope', '$state', 'authService', MobileHeaderController],
  controllerAs: 'mobileHeaderCtrl',
  bindings: {
    ways: '<'
  }
};

function MobileHeaderController($log, $http, $location, $mdToast, $rootScope, $state, authService) {

  this.currentUrl = $location.url();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.currentUrl = $location.url();
  });

  this.gotoWay = function() {
    $location.url('/way');
  };
  this.gotoHome = function() {
    $location.url('/home');
  };
  this.gotoMessage = function() {
    $location.url('/message');
  };

  this.toggleProfile = function() {
    $rootScope.$emit('toggleProfile');
  };

  this.logout = function() {
    $log.debug('MobileHeaderController.logout');
    authService.logout()
    .then( () => {
      $mdToast.showSimple('You have logged out successfully')
      .then( $location.url('/join'));
    })
    .catch( err => {
      $log.error(err.message);
      $mdToast.showSimple(`Unable to log out | ${err}`);
    });
  };
}

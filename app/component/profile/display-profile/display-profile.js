'use strict';

require('./_display-profile.scss');

module.exports = {
  template: require('./display-profile.html'),
  controller: ['$log', '$mdToast', '$mdSidenav', '$window', DisplayProfileController],
  controllerAs: 'displayProfileCtrl'
};

function DisplayProfileController($log, $mdToast, $mdSidenav, $window) {
  $log.debug('DisplayProfileController');

  // if (!$window.token) return $mdToast.showSimple('unauthorized request');
  
  this.closeProfile = function() {
    $mdSidenav('left').close();
  };

  this.isOpen = false;
}
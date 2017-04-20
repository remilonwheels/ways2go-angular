'use strict';

require('./_display-profile.scss');

module.exports = {
  template: require('./display-profile.html'),
  controller: ['$log', '$mdToast', '$mdSidenav', '$window', DisplayProfileController],
  controllerAs: 'displayProfileCtrl',
  bindings: {
    profile: '<'
  }
};

function DisplayProfileController($log, $mdToast, $mdSidenav) {
  $log.debug('DisplayProfileController');

  this.closeProfile = function() {
    $mdSidenav('left').close();
  };

  this.isOpen = false;
}

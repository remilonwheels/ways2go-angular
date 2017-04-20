'use strict';

require('./_display-profile.scss');

module.exports = {
  template: require('./display-profile.html'),
  controller: ['$log', '$mdToast', '$mdSidenav', '$rootScope', DisplayProfileController],
  controllerAs: 'displayProfileCtrl',
  bindings: {
    profile: '<'
  }
};

function DisplayProfileController($log, $mdToast, $mdSidenav, $rootScope) {
  $log.debug('DisplayProfileController');

  $rootScope.$on('toggleProfile', () => {
    $mdSidenav('left').toggle();
  });

  this.closeProfile = function() {
    $mdSidenav('left').close();
  };

  this.isOpen = false;
}

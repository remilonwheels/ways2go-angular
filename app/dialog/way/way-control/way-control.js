'use strict';

require('./_way-control.scss');

module.exports = {
  template: require('./way-control.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', 'way', '$scope', 'messageService', 'profileService', '$mdMedia', WayControlController],
  controllerAs: 'wayControlCtrl'
};

function WayControlController($log, $mdDialog, $mdToast, wayService, way, $scope, messageService, profileService, $mdMedia) {

  this.closeDialog = function() {
    $mdDialog.hide();
  };

}

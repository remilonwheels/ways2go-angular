'use strict';

require('./_create-way.scss');

module.exports = {
  template: require('./create-way.html'),
  controller: ['$log', '$mdDialog', 'wayService', 'items',  CreateWayController],
  controllerAs: 'createWayCtrl'
}

function CreateWayController($log, $mdDialog, wayService, items) {
  $log.debug('CreateWayController');

  this.way = {};

  this.createWaySubmit = function() {
    wayService.createWay(this.way)
    .then( way => {
      $log.log(way);
    });
    $log.log(this.way);
  }
  //
  this.items = items;
  this.closeDialog = function() {
    $mdDialog.hide();
  }


}

'use strict';

require('./_create-way.scss');

module.exports = {
  template: require('./create-way.html'),
  controller: ['$log', '$mdDialog', 'wayService', 'items',  CreateWayController],
  controllerAs: 'createWayCtrl'
};

function CreateWayController($log, $mdDialog, wayService, items) {
  $log.debug('CreateWayController');

  this.way = {};
  this.isLoading = false;

  this.createWaySubmit = function() {
    this.isLoading = true;
    wayService.createWay(this.way)
    .then( way => {
      $log.log(way);
      this.isLoading = false;
    })
    .catch( err => {
      console.log('err caught:', err);
    });

    $log.log(this.way);
  };

  this.items = items;
  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

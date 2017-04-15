'use strict';

require('./_create-way.scss');

module.exports = {
  template: require('./create-way.html'),
  controller: ['$log', 'wayService', CreateWayController],
  controllerAs: 'createWayCtrl'
}

function CreateWayController($log, wayService) {
  $log.debug('CreateWayController');

  this.way = {};

  this.createWay = function() {
    wayService.createWay(this.way)
    .then( () => {
      
    });
  }


}

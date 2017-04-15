'use strict';

require('./_waymap.scss');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', WayMapController],
  controllerAs: 'wayMapCtrl'
};

function WayMapController($log) {
  $log.debug('WayMapController');

  this.ways = [];
};

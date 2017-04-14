'use strict';

require('./_waymap.scss');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', 'galleryService', WayMapController],
  controllerAs: 'wayMapCtrl'
};

function WayMapController($log, galleryService) {
  $log.debug('WayMapController');

  this.ways = [];
};

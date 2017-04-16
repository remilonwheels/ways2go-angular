'use strict';

require('./_waymap.scss');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', WayMapController],
  controllerAs: 'wayMapCtrl'
};

function WayMapController($log, $http, $interval, NgMap) {
  $log.debug('WayMapController');

  console.log('should not', this.map);

  NgMap.getMap().then( map => {
    this.map = map;
    console.log(this.map);
  });

  console.log('should not show again', this.map);
}

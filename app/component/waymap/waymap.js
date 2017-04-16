'use strict';

require('./_waymap.scss');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', WayMapController],
  controllerAs: 'wayMapCtrl',
  bindings: {
    ways: '<'
  }
};

function WayMapController($log, $http, $interval, NgMap) {
  $log.debug('WayMapController');

  this.type = 'geocode';
  this.centerOnLoad = '';


  this.placeChanged = function() {
    setPlaceChange(this.getPlace());
  };

  const setPlaceChange = (place) => {
    this.place = place;
    this.map.setCenter(this.place.geometry.location);
  };

  NgMap.getMap().then( map => {
    this.map = map;
    console.log('ways in ngmap cb', this.ways);
  });

}

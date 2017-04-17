'use strict';

require('./_waymap.scss');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', 'wayService', WayMapController],
  controllerAs: 'wayMapCtrl',
  bindings: {
    ways: '<'
  }
};

function WayMapController($log, $http, $interval, NgMap, wayService) {
  $log.debug('WayMapController');

  //map config
  this.type = 'geocode';
  this.centerOnLoad = [ 47.618217, -122.351832 ];

  //map data

  const mapInit = () => {
    NgMap.getMap().then( map => {
      this.map = map;

      this.startMarkers = this.ways.map( way => [way.startLocation.lat, way.startLocation.lng]);

      this.endMarkers = this.ways.map( way => [way.endLocation.lat, way.endLocation.lng]);
    });
  };

  this.placeChanged = function() {
    setPlaceChange(this.getPlace());
  };

  const setPlaceChange = (place) => {
    this.place = place;
    this.map.setCenter(this.place.geometry.location);
  };


  mapInit();
}

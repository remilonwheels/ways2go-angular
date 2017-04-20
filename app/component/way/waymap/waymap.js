'use strict';

require('./_waymap.scss');

const viewWayComponent = require('../../../dialog/way/view-way/view-way.js');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', 'wayService', '$mdMedia', '$scope', '$mdDialog', WayMapController],
  controllerAs: 'wayMapCtrl',
  bindings: {
    ways: '<'
  }
};

function WayMapController($log, $http, $interval, NgMap, wayService, $mdMedia, $scope, $mdDialog) {
  $log.debug('WayMapController');

  //map config
  this.type = 'geocode';
  this.centerOnLoad = [ 47.618217, -122.351832 ];
  // this.isMapInitialized = false;

  this.startMarkers = [];
  this.endMarkers = [];
  this.googlePaths = [];

  const drawWays = () => {
    NgMap.getMap().then( map => {

      this.startMarkers.forEach( marker => marker.setMap(null));
      this.endMarkers.forEach( marker => marker.setMap(null));
      this.googlePaths.forEach( path => path.setMap(null));
      this.startMarkers = [];
      this.endMarkers = [];
      this.googlePaths = [];

      this.ways.forEach( way => {

        let startPos = new google.maps.LatLng(way.startLocation.lat, way.startLocation.lng);
        let endPos = new google.maps.LatLng(way.endLocation.lat, way.endLocation.lng);

        let bounds = new google.maps.LatLngBounds();
        bounds.extend(startPos);
        bounds.extend(endPos);
        map.fitBounds(bounds);

        let startMarker = new google.maps.Marker({
          map: map,
          position: startPos,
          wayID: way._id
        });

        let endMarker = new google.maps.Marker({
          map: map,
          position: endPos,
          wayID: way._id
        });

        let waypath = [
          {
            lat: way.startLocation.lat,
            lng: way.startLocation.lng
          },
          {
            lat: way.endLocation.lat,
            lng: way.endLocation.lng
          }
        ];

        let dash = {
          path: 'M -1,1 0,-1 1,1',
          strokeOpacity: 1,
          scale: 3.5
        };

        let googlePath = new google.maps.Polyline({
          map: map,
          path: waypath,
          geodesic: true,
          strokeColor: '#3f51b5',
          strokeOpacity: 0,
          icons: [{
            icon: dash,
            offset: '0',
            repeat: '20px'
          }],
        });

        this.startMarkers.push(startMarker);
        this.endMarkers.push(endMarker);
        this.googlePaths.push(googlePath);

        google.maps.event.addListener(startMarker, 'click', function() {
          let _way = wayService.getOneWay(this.wayID);

          viewWay(event, true, _way);
        });

        google.maps.event.addListener(endMarker, 'click', function() {
          let _way = wayService.getOneWay(this.wayID);

          viewWay(event, true, _way);
        });
      });


    });
  };

  //map data
  this.mapInit = () => {
    NgMap.getMap().then( map => {
      this.isMapInitialized = true;
      this.map = map;
      drawWays();

    });
  };


  this.placeChanged = function() {
    // "this" inside function references the location entered in from the search bar
    setPlaceChange(this.getPlace());
  };

  const setPlaceChange = (place) => {
    this.place = place;
    this.map.setCenter(this.place.geometry.location);
    $log.debug('wapmap searchbar address', this.address);
  };

  const viewWay = function ($event, bindFlag, way) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      scope: $scope.$new(bindFlag),
      resolve: {
        way: function() {
          return way;
        }
      },
    };
    $mdDialog.show(Object.assign(viewWayComponent, dialogConfig));
  };


  $scope.$on('wayChange', function() {
    $log.debug('waychange broadcast');

    drawWays();
  });
}

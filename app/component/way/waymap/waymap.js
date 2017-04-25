/* global google */
'use strict';

require('./_waymap.scss');

const viewWayComponent = require('../../../dialog/way/view-way/view-way.js');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', 'wayService', '$mdMedia', '$scope', '$mdDialog', 'profileService', WayMapController],
  controllerAs: 'wayMapCtrl',
  bindings: {
    ways: '<'
  }
};

function WayMapController($log, $http, $interval, NgMap, wayService, $mdMedia, $scope, $mdDialog, profileService) {
  $log.debug('WayMapController');

  profileService.fetchProfile()
  .then( profile => {
    this.profile = profile;
    console.log(this.profile);

    //map config
    this.type = 'geocode';
    // this.centerOnLoad = [ 47.618217, -122.351832 ];
    this.centerOnLoad = [ Number(this.profile.address[0].lat), Number(this.profile.address[0].lat)];
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

          let startPos = new google.maps.LatLng(Number(way.startLocation.lat), Number(way.startLocation.lng));
          let endPos = new google.maps.LatLng(Number(way.endLocation.lat), Number(way.endLocation.lng));

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
              lat: Number(way.startLocation.lat),
              lng: Number(way.startLocation.lng)
            },
            {
              lat: Number(way.endLocation.lat),
              lng: way.endLocation.lng
            }
          ];

          let dash = {
            path: 'M -1,1 0,-1 1,1',
            strokeOpacity: 1,
            scale: 3.5
          };

          let color = '';
          if (way.profileID === this.profile._id) {
            color = '#3f51b5';
          } else color = '#757575';

          let googlePath = new google.maps.Polyline({
            map: map,
            path: waypath,
            geodesic: true,
            strokeColor: color,
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

            viewWay(event, true, _way); // eslint-disable-line
          });

          google.maps.event.addListener(endMarker, 'click', function() {
            let _way = wayService.getOneWay(this.wayID);

            viewWay(event, true, _way); // eslint-disable-line
          });


        });
        let myLastWay = this.ways.filter( way => way.profileID === this.profile._id)[0];
        let myLastStartPos = new
        google.maps.LatLng(Number(myLastWay.startLocation.lat), Number(myLastWay.startLocation.lng));
        let myLastEndPos = new google.maps.LatLng(Number(myLastWay.endLocation.lat), Number(myLastWay.endLocation.lng));

        let bounds = new google.maps.LatLngBounds();
        bounds.extend(myLastStartPos);
        bounds.extend(myLastEndPos);
        map.fitBounds(bounds);
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


    $scope.$on('wayChange', () => {
    // $scope.$on('wayChange', function() {
      $log.debug('waychange broadcast');

      drawWays();
    });
  });

}

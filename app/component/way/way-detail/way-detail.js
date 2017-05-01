/* global google */

'use strict';

require('./_way-detail.scss');

const viewWayComponent = require('../../../dialog/way/view-way/view-way.js');

module.exports = {
  template: require('./way-detail.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', 'wayService', '$mdMedia', '$scope', '$mdDialog', 'profileService', WayDetailController],
  controllerAs: 'wayDetailCtrl',
  bindings: {
    ways: '<',
    searchLocation: '<'
  }
};

function WayDetailController($log, $http, $interval, NgMap, wayService, $mdMedia, $scope, $mdDialog, profileService) {
  $log.debug('WayDetailController');



  // this.createDistanceWays = function createDistanceWays() {
  //   $log.debug('WayDetailController createDistanceWays()');
  //   console.log('WayDetailController createDistanceWays()');
  //
  //   const meterToMile = 0.000621371;
  //   this.distanceWays = this.ways.map( way => Object.assign(way, {distance: this.computeWayDistance(way) * meterToMile}));
  // };
  //
  // this.computeWayDistance = (way) => {
  //   return google.maps.geometry.spherical.computeDistanceBetween(
  //     new google.maps.LatLng(Number(way.startLocation.lat), Number(way.startLocation.lng)),
  //     new google.maps.LatLng(Number(this.searchLocation.lat), Number(this.searchLocation.lng))
  //   );
  // };

  this.$onInit = () => {
    this.distanceWays = this.ways;
    // this.createDistanceWays();
  };

  profileService.fetchProfile()
  .then( profile => {
    this.profile = profile;
  });

  this.viewWay = function ($event, bindFlag, way) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      resolve: {
        way: function() {
          return way;
        }
      },
    };
    $mdDialog.show(Object.assign(viewWayComponent, dialogConfig));
  };

  // $scope.$on('searchChange', () => {
  //   this.createDistanceWays();
  // });
}

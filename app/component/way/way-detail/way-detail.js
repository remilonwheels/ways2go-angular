/* global google */

'use strict';

require('./_way-detail.scss');

const viewWayComponent = require('../../../dialog/way/view-way/view-way.js');

module.exports = {
  template: require('./way-detail.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', 'wayService', '$mdMedia', '$scope', '$mdDialog', 'profileService', WayDetailController],
  controllerAs: 'wayDetailCtrl',
  bindings: {
    ways: '<'
  }
};

function WayDetailController($log, $http, $interval, NgMap, wayService, $mdMedia, $scope, $mdDialog, profileService) {
  $log.debug('WayDetailController');


  this.createDistanceWays = function createDistanceWays() {
    this.distanceWays = this.ways.map( way => Object.assign(way, {distance: computeWayDistance.call(way)}));

    function computeWayDistance() {
      return google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(Number(this.startLocation.lat), Number(this.startLocation.lng)),
        new google.maps.LatLng(Number(this.endLocation.lat), Number(this.endLocation.lng))
      );
    }
  };

  this.$onInit = () => {
    this.createDistanceWays();
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

  $scope.$on('wayChange', () => {
    this.createDistanceWays();
  });

}

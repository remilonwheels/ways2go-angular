'use strict';

require('./_way.scss');

const createWayComponent = require('../../dialog/way/create-way/create-way.js');
const editWayComponent = require('../../dialog/way/edit-way/edit-way.js');

module.exports = ['$log', '$rootScope', '$mdDialog', 'wayService', '$http', '$interval', 'NgMap', '$mdMedia', '$scope', WayController];

function WayController($log, $rootScope, $mdDialog, wayService, $http, $interval, NgMap, $mdMedia, $scope) {
  $log.debug('WayController');

  this.ways = wayService.getWays();
  this.currentWay = null;
  this.mapView = true;

  this.createWay = function ($event, bindFlag) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      scope: $scope.$new(bindFlag)
    };
    $mdDialog.show(Object.assign(createWayComponent, dialogConfig));
  };

  this.editWay = function ($event, bindFlag) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      scope: $scope.$new(bindFlag)
    };
    $mdDialog.show(Object.assign(editWayComponent, dialogConfig));
  };

  this.fetchWays = function() {
    wayService.fetchWays()
    .then( ways => {
      //changed this assignment for binding issue
      // angular.copy(ways, this.ways) //eslint-disable-line
      //old
      // this.ways = ways;

      console.log('this.ways in way controller fetchways:', this.ways);
    })
    .catch( err => {
      $log.error(err);
    });
  };

  this.deleteWay = function(way) {
    console.log('before delete', this.ways.length);
    wayService.deleteWay(way)
    .then( () => {
      console.log('after delete', this.ways.length);
      console.log('delete successful');
    })
    .catch( err => {
      $log.error(err);
    });
  };

  this.toggleView = function() {
    this.mapView = !this.mapView;
  };

  this.fetchWays();

  $scope.$watchCollection('wayCtrl.ways', function(newValue, oldValue, scope) {
    $scope.$broadcast('wayChange');
  });

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchWays();
  });
}

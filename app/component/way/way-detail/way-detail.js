'use strict';

require('./_way-detail.scss');

const editWayComponent = require('../../../dialog/way/edit-way/edit-way.js');

module.exports = {
  template: require('./way-detail.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', 'wayService', '$mdMedia', '$scope', '$mdDialog', WayDetailController],
  controllerAs: 'wayDetailCtrl',
  bindings: {
    ways: '<'
  }
};

function WayDetailController($log, $http, $interval, NgMap, wayService, $mdMedia, $scope, $mdDialog) {
  $log.debug('WayDetailController');

  this.editWay = function ($event, bindFlag, way) {
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
    $mdDialog.show(Object.assign(editWayComponent, dialogConfig));
  };

  //vars
  // this.way = {}; //binded???
}

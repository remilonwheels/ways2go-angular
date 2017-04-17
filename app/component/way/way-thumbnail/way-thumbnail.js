'use strict';

require('./_way-thumbnail.scss');

const editWayComponent = require('../..//../dialog/way/edit-way/edit-way.js');

module.exports = {
  template: require('./way-thumbnail.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', 'wayService', '$mdMedia', '$scope', '$mdDialog', WayThumbnailController],
  controllerAs: 'wayThumbnailCtrl',
  bindings: {
    ways: '<'
  }
};

function WayThumbnailController($log, $http, $interval, NgMap, wayService, $mdMedia, $scope, $mdDialog) {
  $log.debug('WayThumbnailController');

  console.log('this in way thumbnail', this);
  this.editWay = function ($event, bindFlag, way) {
    console.log('way in editway', way);
    console.log('this in edit thumb', this);
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

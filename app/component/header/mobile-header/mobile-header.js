'use strict';

require('./_mobile-header.scss');

// const editWayComponent = require('../../../dialog/way/edit-way/edit-way.js');
// const viewWayComponent = require('../../../dialog/way/view-way/view-way.js');

module.exports = {
  template: require('./mobile-header.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', 'wayService', '$mdMedia', '$scope', '$mdDialog', MobileHeaderController],
  controllerAs: 'mobileHeaderCtrl',
  bindings: {
    ways: '<'
  }
};

function MobileHeaderController($log, $http, $interval, NgMap, wayService, $mdMedia, $scope, $mdDialog) {

}

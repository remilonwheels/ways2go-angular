'use strict';

require('./_mobile-header.scss');


module.exports = {
  template: require('./mobile-header.html'),
  controller: ['$log', '$http', '$location', MobileHeaderController],
  controllerAs: 'mobileHeaderCtrl',
  bindings: {
    ways: '<'
  }
};

function MobileHeaderController($log, $http, $location) {

  this.gotoWay = function() {
    $location.url('/way');
  };
  this.gotoHome = function() {
    $location.url('/test');
  };
  this.gotoMessage = function() {
    $location.url('/message');
  };
}

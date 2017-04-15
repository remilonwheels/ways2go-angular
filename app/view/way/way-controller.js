'use strict';

require('./_way.scss');

const createWayComponent = require('../../component/way/create-way/create-way.js');

module.exports = ['$log', '$rootScope', '$mdDialog', 'wayService', WayController];

function WayController($log, $rootScope, $mdDialog, wayService) {
  $log.debug('WayController');

  this.ways = [];
  this.currentWay = null;

  this.createWay = function ($event) {
    const parent = angular.element(document.body);
    $mdDialog.show({
      parent,
      targetEvent: $event,
      template: createWayComponent.template,
      // same as BINDINGS for components //
      locals: {
        items: this.items
      },
      ////////////////////////////////////
      controller: createWayComponent.controller,
      controllerAs: createWayComponent.controllerAs
   });
  }

  this.fetchWays = function() {
    wayService.fetchWays()
    .then( ways => {
      this.ways = ways;
      console.log(this.ways);
    })
    //TODO: decide to set currentWay
  };

  this.fetchWays();

  function makeMarkers() {
    
  }


 $rootScope.$on('$locationChangeSuccess', () => {
   this.fetchWays();
 });
}

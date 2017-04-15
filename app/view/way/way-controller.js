'use strict';

require('./_way.scss');

const createWayComponent = require('../../component/way/create-way/create-way.js');

module.exports = ['$log', '$mdDialog', WayController];

function WayController($log, $mdDialog) {
  $log.debug('WayController');

  this.createWay = createWay;
  function createWay($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      template: createWayComponent.template,
      locals: {
        items: this.items
      },
      controller: createWayComponent.controller,
      controllerAs: createWayComponent.controllerAs
   });
  }
}

'use strict';

require('./_landing.scss');

const createUserComponent = require('../../dialog/user/create-user/create-user.js');

module.exports = ['$log', '$rootScope', '$mdDialog', '$location', LandingController];

function LandingController($log, $rootScope, $mdDialog, $location) {
  $log.debug('LandingController');

  // let url = $location.url() === '/join#signup' || url === '/join';
  this.signup = function($event) {
    const parent = angular.element(document.body);
    $mdDialog.show({
      parent,
      targetEvent: $event,
      template: createUserComponent.template,
      locals: {
        items: this.items
      },
      controller: createUserComponent.controller,
      controllerAs: createUserComponent.controllerAs
    });
  };

  // $rootScope.$on('$locationChangeSuccess', () => {
  //
  // });
}

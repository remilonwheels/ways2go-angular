'use strict';

require('./_landing.scss');

const createUserComponent = require('../../dialog/user/create-user/create-user.js');

module.exports = ['$log', '$rootScope', '$mdDialog', '$location', '$mdMedia', '$scope', LandingController];

function LandingController($log, $rootScope, $mdDialog, $location, $mdMedia, $scope) {
  $log.debug('LandingController');

  // let url = $location.url() === '/join#signup' || url === '/join';
  this.signup = function($event, bindFlag) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      scope: $scope.$new(bindFlag)
    };
    $mdDialog.show(Object.assign(createUserComponent, dialogConfig));
  };

  // $rootScope.$on('$locationChangeSuccess', () => {
  //
  // });
}

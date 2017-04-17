'use strict';

require('./_test.scss');

//BRING IN YOUR COMPONENt HERE
const testDialogComponent = require('../../dialog/test/test-dialog/test-dialog.js');
const createMessageComponent = require
('../../dialog/message/create-message/create-message.js');

module.exports = ['$log', '$rootScope', '$mdDialog', 'wayService', 'messageService','$http', '$interval', 'NgMap', '$mdMedia', '$scope', TestController];
// INSERT SERVICES IN DEPENDENCIES HERE, ex: wayService


// INSERT SERVICES AGAIN IN PARAMETERS, ex: wayService
function TestController($log, $rootScope, $mdDialog, wayService, messageService, $http, $interval, NgMap, $mdMedia, $scope) {
  $log.debug('TestController');

  //  THIS CREATES THE DIALOG, PUT THIS ON THE NG-CLICK EVENT OF WHERE YOU WANT TO PUT YOUR COMPONENT
  this.testDialog = function ($event, bindFlag) {

    //STANDARD DIALOG CONFIGURATION, YOU CAN ADD MORE
    const dialogConfig = {
      //makes dialog responsive
      fullscreen: !$mdMedia('gt-sm'),
      //makes dialog animate from the location of click
      targetEvent: $event,
      //binds data from the parent
      scope: $scope.$new(bindFlag)
    };

    //DIALOG MAGIC!
    $mdDialog.show(Object.assign(testDialogComponent, dialogConfig));
  };

  this.createMessage = function ($event, bindFlag) {

    //STANDARD DIALOG CONFIGURATION, YOU CAN ADD MORE
    const dialogConfig = {
      //makes dialog responsive
      fullscreen: !$mdMedia('gt-sm'),
      //makes dialog animate from the location of click
      targetEvent: $event,
      //binds data from the parent
      scope: $scope.$new(bindFlag)
    };

    //DIALOG MAGIC!
    $mdDialog.show(Object.assign(createMessageComponent, dialogConfig));
  };

  

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchWays();
  });

}
 

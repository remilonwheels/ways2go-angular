'use strict';

require('./_message.scss');

const createMessageDialog = require('../../dialog/message/create-message/create-message.js');

module.exports = ['$log', '$rootScope', '$mdDialog', 'messageService', '$http', '$interval', '$mdMedia', '$scope', MessageController];

function MessageController($log, $rootScope, $mdDialog, messageService, $http, $interval, $mdMedia, $scope) { // eslint-line-disable
  $log.debug('MessageController');

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
    $mdDialog.show(Object.assign(createMessageDialog, dialogConfig));

  };
}

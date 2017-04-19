'use strict';

require('./_message-thumbnail.scss');
const readMessageDialog = require('../../../dialog/message/read-message/read-message.js');

module.exports = {
  template: require('./message-thumbnail.html'),
  controller: ['$log', '$http', '$interval', '$mdMedia', '$scope', '$mdDialog', 'profileService', 'messageService', MessageThumbnailController],
  controllerAs: 'messagethumbnailCtrl',
  bindings: {
    incoming: '='
  }
};

function MessageThumbnailController($log, $http, $interval, $mdMedia, $scope, $mdDialog, profileService, messageService) { // eslint-line-disable
  $log.debug('MessageThumbnailController');

  this.messages = [];
  profileService.fetchProfile()
  .then((profile) => {
    this.profile = profile;
    return messageService.fetchMessages();
  })
  .catch(() => {
    this.profile = {_id: '123'};
    return messageService.fetchMessages();
  })
  .then((messages) => {
    this.messages = messages;
    this.messages.push({title:'Hi!', text: 'TEST Incoming: Are you there?', timestamp: '3:22am',
      toProfileId: this.profile._id, fromProfileId: 'foo'});
    this.messages.push({title:'Hi!', text: 'TEST Outgoing: Are you there?', timestamp: '3:22am',
      fromProfileId: this.profile._id, toProfileId: 'foo'});

    if (this.incoming) {
      this.messages = this.messages.filter((msg) => (msg.toProfileId == this.profile._id));
    } else {
      this.messages = this.messages.filter((msg) => (msg.fromProfileId == this.profile._id));
    }
  })
  .catch((err) => {
    $log.error(err.message);
    return $q.reject(err);
  });

  this.readMessage = function ($event, bindFlag, message) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      scope: $scope.$new(bindFlag),
      resolve: {
        way: function() {
          return message;
        }
      },
    };
    $mdDialog.show(Object.assign(readMessageDialog, dialogConfig));
  };
}

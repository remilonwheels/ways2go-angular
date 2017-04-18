'use strict';

require('./_message-thumbnail.scss');

module.exports = {
  template: require('./message-thumbnail.html'),
  controller: ['$log', 'messageService', MessageThumbnailController],
  controllerAs: 'messagethumbnailCtrl'
};

function MessageThumbnailController($log, messageService) { // eslint-line-disable
  $log.debug('MessageThumbnailController');

  this.title = 'Message Title';
  this.text = 'This message is about some cool way';
  this.timestamp = '10:00am';
}

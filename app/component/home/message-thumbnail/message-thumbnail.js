'use strict';

require('./_message-thumbnail.scss');

module.exports = {
  template: require('./message-thumbnail.html'),
  controller: ['$log', 'messageService', MessageThumbnailController],
  controllerAs: 'messagethumbnailCtrl'
};

function MessageThumbnailController($log, messageService) { // eslint-line-disable
  $log.debug('MessageThumbnailController');
}

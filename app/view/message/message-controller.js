'use strict';

require('./_message.scss');

module.exports = ['$log', 'messageService', MessageController];

function MessageController($log, messageService) { // eslint-line-disable
  $log.debug('MessageController');
}

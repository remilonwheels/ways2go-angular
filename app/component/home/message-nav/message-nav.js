'use strict';

require('./_message-nav.scss');

module.exports = {
  template: require('./message-nav.html'),
  controller: ['$log', 'messageService', MessageNavController],
  controllerAs: 'messageNavCtrl'
};

function MessageNavController($log, messageService) { // eslint-line-disable
  $log.debug('MessageNavController');
}

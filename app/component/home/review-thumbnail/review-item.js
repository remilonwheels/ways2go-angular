'use strict';

require('./_review-item.scss');

module.exports = {
  template: require('./review-item.html'),
  controller: ['$log', 'reviewService', ReviewItemController],
  controllerAs: 'reviewItemCtrl',
};

function ReviewItemController($log) {
  $log.debug('ReviewItemController');
}

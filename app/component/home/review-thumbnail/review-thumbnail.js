'use strict';

require('./_review-thumbnail.scss');

module.exports = {
  template: require('./review-thumbnail.html'),
  controller: ['$log', 'reviewService', ReviewItemController],
  controllerAs: 'reviewItemCtrl',
};

function ReviewItemController($log) {
  $log.debug('ReviewItemController');
}

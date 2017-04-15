'use strict';

require('./_review-item.scss');

module.exports = {
  template: require('./review-item.html'),
  controller: ['$log', 'reviewService', ReviewItemController],
  controllerAs: 'reviewItemCtrl',
  bindings: {
    profileID: '<',
    reviewedprofileID: '<',
    way: '<'
  }
};

function ReviewItemController($log) {
  $log.debug('ReviewItemController');
}

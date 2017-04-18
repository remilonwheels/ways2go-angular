'use strict';

require('./_review-thumbnail.scss');

module.exports = {
  template: require('./review-thumbnail.html'),
  controller: ['$log', 'reviewService', Reviewthumbnailontroller],
  controllerAs: 'reviewthumbnailCtrl',
};

function Reviewthumbnailontroller($log) {
  $log.debug('Reviewthumbnailontroller');

  this.rating = '4.5';
  this.comment = 'Bob is great to ride with, he has the best music, but he chews loudly.';
}

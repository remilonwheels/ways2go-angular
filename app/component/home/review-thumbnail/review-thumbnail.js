'use strict';

require('./_review-thumbnail.scss');

module.exports = {
  template: require('./review-thumbnail.html'),
  controller: ['$log', 'reviewService', Reviewthumbnailontroller],
  controllerAs: 'reviewthumbnailCtrl',
};

function Reviewthumbnailontroller($log) {
  $log.debug('Reviewthumbnailontroller');

  this.review = {
    rating: '4.5',
    comment: 'Bob is great to ride with, he has the best music, but he chews loudly.'
  };

}

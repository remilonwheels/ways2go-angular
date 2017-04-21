'use strict';

require('./_review-thumbnail.scss');

module.exports = {
  template: require('./review-thumbnail.html'),
  controller: ['$log', 'reviewService', Reviewthumbnailontroller],
  controllerAs: 'reviewthumbnailCtrl',
};

function Reviewthumbnailontroller($log) {
  $log.debug('Reviewthumbnailontroller');

  this.review1 = {
    rating: '4.5',
    comment: 'Nice conversation, terrible music choices.'
  };

  this.review2 = {
    rating: '4.5',
    comment: 'Will happily ride together again.'
  };

}

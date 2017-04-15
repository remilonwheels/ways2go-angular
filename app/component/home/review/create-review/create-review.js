'use strict';

require('./_create-review.scss');

module.exports = {
  template: require('./create-review.html'),
  controller: ['$log', 'reviewService', ReviewController],
  controllerAs: 'reviewCtrl',
  bindings: {
    profile: '<',
    way: '<'
  }
};

function ReviewController($log, reviewService) {
  $log.debug('ReviewController');

  this.review = {};

  this.createReview = function() {
    reviewService.createReview(this.profile, this.way, this.review)
    .then( () => {
      this.review.rating = null;
      this.review.comment = null;
      this.review.wayID = null;
      this.profile.profileID = null;
    });
  };
}

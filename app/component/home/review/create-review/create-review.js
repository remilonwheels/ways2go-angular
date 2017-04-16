'use strict';

require('./_create-review.scss');

module.exports = {
  template: require('./create-review.html'),
  controller: ['$log', '$mdDialog', 'reviewService', 'items', ReviewController],
  controllerAs: 'reviewCtrl',
  // bindings: {
  //   profile: '<',
  //   way: '<'
  // }
};

function ReviewController($log, reviewService) {
  $log.debug('ReviewController');

  this.review = {};

  this.isLoading = false;

  this.createReview = function() {
    this.isLoading = true;
    reviewService.createReview(this.profile, this.way, this.review)
    .then( () => {
      this.isLoading = false;

      this.review.rating = null;
      this.review.comment = null;
      this.review.wayID = null;
      this.profile.profileID = null;
    });
  };

  this.items = items;
  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

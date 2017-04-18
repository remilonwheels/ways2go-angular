'use strict';

require('./_create-review.scss');

module.exports = {
  template: require('./create-review.html'),
  controller: ['$log', '$mdDialog', '$mdToast', 'reviewService', ReviewController],
  controllerAs: 'reviewCtrl',
};

function ReviewController($log, $mdDialog, $mdToast, reviewService) {
  $log.debug('ReviewController');

  this.review = {};

  this.isLoading = false;

  this.createReview = function() {
    this.isLoading = true;
    reviewService.createReview(this.profile, this.way, this.review)
    .then( (review) => {
      $mdToast.showSimple('Created a Review successfully');
      $log.log(review);
      this.isLoading = false;

      this.review.rating = null;
      this.review.comment = null;
      this.review.wayID = null;
      this.profile.profileID = null;
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = false;
    });
    $log.log(this.review);
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

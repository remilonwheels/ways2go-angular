'use strict';

require('./_see-review.scss');

module.exports = {
  template: require('./see-review.html'),
  controller: ['$log', '$mdDialog', '$mdToast', 'reviewService', SeeReviewController],
  controllerAs: 'seeReviewCtrl',
};

function SeeReviewController($log, $mdDialog, $mdToast, reviewService) {
  $log.debug('ReviewController');

  this.review = {};

  this.isLoading = false;

  this.rating = '4.5';
  this.comment = 'Bob is great to ride with, he has the best music, but he chews loudly.';

  this.seeReview = function() {
    this.isLoading = true;
    reviewService.seeReview(this.profile, this.way, this.review)
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

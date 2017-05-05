'use strict';

require('./_create-review.scss');

module.exports = {
  template: require('./create-review.html'),
  controller: ['$log', '$mdDialog', '$mdToast', 'profile', CreateReviewController],
  controllerAs: 'createReviewCtrl'
};

function CreateReviewController($log, $mdDialog, $mdToast, profile) {
  $log.debug('CreateReviewController');

  this.review = {};

  this.profile = profile;

  
}

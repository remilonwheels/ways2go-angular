'use strict';

require('./_view-one-profile.scss');

const createMessageDialog = require('../../message/profile-message/profile-message.js');

module.exports = {
  template: require('./view-one-profile.html'),
  controller: ['$log', '$mdDialog', '$mdMedia', '$window', 'reviewService', 'profile',  ViewOneProfileController],
  controllerAs: 'viewOneProfileCtrl'
};

function ViewOneProfileController($log, $mdDialog, $mdMedia, $window, reviewService, profile) {

  this.profile = profile;
  this.isLoading = false;

  this.$onInit = () => {
    this.setAvgRating();
  };

  this.sendMessage = function($event, bindFlag, msgRecipient) {
    $log.debug('viewOneProfileCtrl.sendMessage');

    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      resolve: {
        msgRecipient: function() {
          return msgRecipient;
        }
      }
    };

    $mdDialog.show(Object.assign(createMessageDialog, dialogConfig));
  };

  this.setAvgRating = function() {
    $log.debug('ViewOneProfileController.setAvgRating');

    return reviewService.fetchReviews(profile)
    .then( reviews => {
      let sum = reviews.reduce((acc, ele) => {
        return acc + ele['rating'];
      }, 0);
      let avg = sum / reviews.length;
      this.avgReview = avg;
    })
    .catch( err => {
      console.error(err.data);
    });
  };

  this.linkMediaSite = function(site, user) {
    return $window.open(`https://www.${site}.com/${user}`, '_blank');
  };

  this.linkGoogle = function(user) {
    return $window.open(`https://www.plus.google.com/${user}`, '_blank');
  };

  this.linkedIn = function(user) {
    return $window.open(`https://www.linkedin.com/in/${user}`, '_blank');
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

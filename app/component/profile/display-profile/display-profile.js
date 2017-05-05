'use strict';

require('./_display-profile.scss');

const editProfileComponent = require('../../../dialog/profile/edit-profile/edit-profile.js');

module.exports = {
  template: require('./display-profile.html'),
  controller: ['$log', '$mdToast', '$mdSidenav', '$rootScope', '$scope', '$mdMedia', '$mdDialog', '$location', '$window', 'profileService', 'reviewService', DisplayProfileController],
  controllerAs: 'displayProfileCtrl',
  bindings: {
    profile: '<'
  }
};

function DisplayProfileController($log, $mdToast, $mdSidenav, $rootScope, $scope, $mdMedia, $mdDialog, $location, $window, profileService, reviewService) {
  $log.debug('DisplayProfileController');

  this.$onInit = () => {
    this.profile = profileService.getProfile();
    this.calcAvgReview(this.profile);
  };
  $log.debug('$$$display this$$$', this);
  this.calcAvgReview = function(profile) {
    $log.debug('DisplayProfileController.avgReview');    return reviewService.fetchReviews(profile)
    .then( reviews => {
      let sum = reviews.reduce((acc, ele) => {
        $log.debug('reduce acc', acc);
        $log.debug('reduce ele', ele);
        return acc + ele['rating'];
      }, 0);
      $log.debug('sum', sum);
      $log.debug('reviews', reviews);
      let avg = sum / reviews.length;
      $log.debug('avg', avg);
      this.avgReview = avg;
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
    });
  };

  this.editProfile = function(bindFlag) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      scope: $scope.$new(bindFlag)
    };

    $mdDialog.show(Object.assign(editProfileComponent, dialogConfig));
  };

  this.deleteProfile = function() {
    $log.debug('DisplayProfileController.deleteProfile');

    this.isLoading = true;

    profileService.deleteProfile()
    .then( () => {
      $mdToast.showSimple('profile deleted')
      .then( () => {
        $location.url('/join');
        $mdDialog.hide();
      });
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
    });
  };

  this.closeProfile = function() {
    $mdSidenav('left').close();
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
  this.isOpen = false;
}

'use strict';

require('./_view-one-profile.scss');

const createMessageDialog = require('../../message/create-message/create-message.js');

module.exports = {
  template: require('./view-one-profile.html'),
  controller: ['$log', '$mdDialog', '$mdMedia', '$mdToast','wayService', '$scope', '$window', 'messageService', 'profileService', 'profile', ViewOneProfileController],
  controllerAs: 'viewOneProfileCtrl'
};

function ViewOneProfileController($log, $mdDialog, $mdMedia, $mdToast, wayService, $scope, $window, messageService, profileService, profile) {
  console.log('profile view one inject', profile);
  console.log(this);

  this.profile = profile;

  this.isLoading = false;

  this.joinSubmit = function() {
    this.isLoading = true;

    console.log(this.way);

    const joinMessage = {
      subject: `${this.profile.displayName} wants to join your way!`,
      text: `Please add me to way ${this.way._id}`,
      toProfileID: this.way.wayerz[0]._id
    };


    messageService.createMessage(joinMessage)
    .then( res => {
      $mdToast.showSimple('Request to Join Sent Successfully!');
      this.isLoading = false;

      $mdDialog.hide();
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = false;
    });

    $log.log(this.way);
  };

  this.sendMessage = function($event, bindFlag) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-xs'),
      targetEvent: $event,
      scope: $scope.$new(bindFlag)
    };

    $mdDialog.show(Object.assign(createMessageDialog, dialogConfig));
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

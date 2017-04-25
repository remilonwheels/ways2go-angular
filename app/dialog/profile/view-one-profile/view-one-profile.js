'use strict';

require('./_view-one-profile.scss');

module.exports = {
  template: require('./view-one-profile.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', '$scope', 'messageService', 'profileService', 'profile', ViewOneProfileController],
  controllerAs: 'viewOneProfileCtrl'
};

function ViewOneProfileController($log, $mdDialog, $mdToast, wayService, $scope, messageService, profileService, profile) {
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

  this.closeDialog = function() {
    $mdDialog.hide();
  };

}

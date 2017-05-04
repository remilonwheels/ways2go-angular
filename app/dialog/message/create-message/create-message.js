'use strict';

require('./_create-message.scss');

module.exports = {
  template: require('./create-message.html'),
  controller: ['$log', '$mdDialog', '$mdToast','messageService', '$timeout', 'profileService', CreateMessageController],
  controllerAs: 'createMessageCtrl'
};

function CreateMessageController($log, $mdDialog, $mdToast,  messageService,  $timeout, profileService) {
  $log.debug('CreateMessageController');

  this.profileToAdd = null;
  this.allProfiles = null;
  this.loadAllProfiles = function() {
    profileService.fetchAllProfiles()
    .then( profiles => {
      this.allProfiles = profiles;
    })
    .catch( err => $log.debug(err));
  };

  this.createMessageSubmit = function() {
    this.isLoading = true;
    this.message.toProfileID = this.profileToAdd._id;

    messageService.createMessage(this.message)
    .then( () => {
      $mdToast.showSimple('Message Sent');
      this.isLoading = false;
      $mdDialog.hide();
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = false;
    });

  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

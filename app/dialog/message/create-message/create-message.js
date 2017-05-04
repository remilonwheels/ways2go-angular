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
    console.log('before', this.message);
    console.log('profile to add', this.profileToAdd);
    this.message.toProfileID = this.profileToAdd._id;
    console.log('after', this.message);

    messageService.createMessage(this.message)
    .then( message => {
      $log.debug('message returned', message);
      $mdToast.showSimple('Message Sent');
      this.msgRecipient = null;
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

'use strict';

require('./_create-message.scss');

module.exports = {
  template: require('./create-message.html'),
  controller: ['$log', '$mdDialog', '$mdToast','messageService', '$timeout', CreateMessageController],
  controllerAs: 'createMessageCtrl'
};

function CreateMessageController($log, $mdDialog, $mdToast,  messageService, $timeout) {
  $log.debug('CreateMessageController');



  this.createMessageSubmit = function() {
    console.log('create message this.message',this.message);
    this.isLoading = true;

    messageService.createMessage(this.message)
    .then( message => {
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

'use strict';

require('./_read-message.scss');
// require('./_message-thumbnail.scss');

module.exports = {
  template: require('./read-message.html'),
  controller: ['$log', '$mdDialog', '$mdToast','messageService', '$timeout', ReadMessageController],
  controllerAs: 'readMessageCtrl',
  bindings: {
    
  }
};

function ReadMessageController($log, $mdDialog, $mdToast,  messageService, $timeout) {
  $log.debug('ReadMessageController');

  this.readMessageSubmit = function() {
    this.isLoading = true;
    $timeout(2000, () => {
      //2 sec delay to simulate async(call to api)
      return;
    })
    .then( () => {
      $mdToast.showSimple('Success!');
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

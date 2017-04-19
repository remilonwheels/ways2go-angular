'use strict';

require('./_read-message.scss');
// require('./_message-thumbnail.scss');

module.exports = {
  template: require('./read-message.html'),
  controller: ['$q', '$log', '$mdDialog', '$mdToast','messageService', '$timeout', ReadMessageController],
  controllerAs: 'readMessageCtrl',
  bindings: {

  }
};

function ReadMessageController($q, $log, $mdDialog, $mdToast,  messageService, $timeout) {
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

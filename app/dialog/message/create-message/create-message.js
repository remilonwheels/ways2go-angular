'use strict';

require('./_create-message.scss');

module.exports = {
  template: require('./create-message.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', '$timeout', CreateMessageController],
  controllerAs: 'createMessageCtrl'
};

function CreateMessageController($log, $mdDialog, $mdToast,  messageService, $timeout) {
  $log.debug('CreateMessageController');

  this.createMessageSubmit = function() {
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

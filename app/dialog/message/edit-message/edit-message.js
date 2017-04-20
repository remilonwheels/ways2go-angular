'use strict';

require('./_edit-message.scss');

module.exports = {
  template: require('./edit-message.html'),
  controller: ['$log', '$mdDialog', '$mdToast','messageService', '$timeout', EditMessageController],
  controllerAs: 'editMessageCtrl'
};

function EditMessageController($log, $mdDialog, $mdToast,  messageService, $timeout) {
  $log.debug('EditMessageController');

  this.editMessageSubmit = function() {
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

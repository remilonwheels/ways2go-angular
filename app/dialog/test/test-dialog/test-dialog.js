'use strict';

require('./_test-dialog.scss');

module.exports = {
  template: require('./test-dialog.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', '$timeout', TestDialogController],
  controllerAs: 'testDialogCtrl'
};

function TestDialogController($log, $mdDialog, $mdToast,  wayService, $timeout) {
  $log.debug('TestDialogController');

  this.testDialogSubmit = function() {
    this.isLoading = true;
    $timeout(2000, () => {
      //2 sec delay to simulate async(call to api)
      return;
    })
    .then( () => {
      $mdToast.showSimple('Success!');
      this.isLoading = false;
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

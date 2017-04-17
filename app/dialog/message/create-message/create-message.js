'use strict';

require('./_create-message.scss');

module.exports = {
  template: require('./create-message.html'),
  controller: ['$log', '$mdDialog', 'messageService',  CreatemessageController],
  controllerAs: 'createmessageCtrl'
}

function CreatemessageController($log, $mdDialog, messageService) {
  $log.debug('CreatemessageController');

  this.message = {};
  this.isLoading = false;

  this.createmessageSubmit = function() {
    this.isLoading = true;
    messageService.createmessage(this.message)
    .then( message => {
      $log.log(message);
      this.isLoading = false;
    })
    .catch( err => {
      console.log('err caught:', err);
    });

    $log.log(this.message);
  }

  this.closeDialog = function() {
    $mdDialog.hide();
  }

}

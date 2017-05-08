'use strict';

require('./_toast.scss');

module.exports = {
  template: require('./toast.html'),
  controller: ['$log', ToastController],
  controllerAs: 'toastCtrl'
};

function ToastController($log) {
  $log.debug('ToastController');

  $log.debug('this in toast controller', this);
  // $rootScope.$on('request error', function(event, message) {
  //   $log.debug('ToastController.requestError');
  //   $log.debug('on event', event);
  //   $log.debug('on message', message);
  //   this.message = message;
  //   $log.debug('this', this);
  //
}

'use strict';

module.exports = ['$log', '$mdToast', toastService];

function toastService($log, $mdToast) {
  $log.debug('toastService');

  let service = {};

  service.displayError = function(errorMessage) {
    $log.debug('toastService.displayError');

    // this.message = errorMessage;
    // $log.debug('displayError this', this);
    $mdToast.show($mdToast.simple()
      .textContent(errorMessage.toUpperCase())
      .theme('error')
      .toastClass('request-error')
      .capsule(true));
    // $mdToast.show({
    //   hideDelay   : 3000,
    //   position    : 'top right',
    //   controller  : 'ToastController',
    //   controllerAs: 'toastCtrl',
    //   // templateUrl : '/app/component/toast/toast.html'
    // });
  };

  return service;
}

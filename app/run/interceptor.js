'use strict';

module.exports = ['$rootScope', 'toastService', interceptor];

function interceptor($rootScope, toastService) {

  $rootScope.$on('request error', function(event, eventData) {
    toastService.displayError(eventData.message);
  });
}

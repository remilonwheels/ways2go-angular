'use strict';

module.exports = ['$q', '$log', '$rootScope', httpInterceptorService];

function httpInterceptorService($q, $log, $rootScope) {
  $log.debug('httpInterceptorService');

  return {
    'response': function(response) {
      switch ( response.status) {
      case 200:
        $rootScope.$broadcast('request success', { message: 'Success' });
        break;
      }
      return response;
    },
    'responseError': function(rejection) {
      let errorMessage = rejection.data.split('##')[1];
      $rootScope.$broadcast('request error', { message: errorMessage });
      return $q.reject(rejection);
    }
  };
}

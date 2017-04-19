'use strict';
module.exports = ['$q', '$log', '$http', 'Upload', 'authService', messageService];
function messageService($q, $log, $http, Upload, authService) {
  $log.debug('messageService');
  let service = {};
  service.messages= [];
  service.createMessage = function(message) {
    $log.debug('messageService.createMessage');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profileID/message`; // eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, message,config);
    })
    .then( res => {
      $log.log('message sending success');
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchMessages = function(message) {
      $log.debug('messageService.fetchMesages');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profileID/message`
      let config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
      };
    return $http.get(url, config);
    })
    .then( res => {
        $log.log('message fetched');
        service.messages = res.data;
        return service.messages;
    })
    .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
    });
  };
  return service;
}

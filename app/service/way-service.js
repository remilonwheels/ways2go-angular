'use strict';

module.exports = ['$q', '$log', '$http', 'authService', wayService];

function wayService($q, $log, $http, authService) {
  $log.debug('wayService');

  let service = {};
  service.ways = [];

  service.createWay = function(way) {
    $log.debug('wayService.createWay');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/way` //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      console.log('service ways before post', service.ways.length);

      return $http.post(url, way, config);
    })
    .then( res => {
      console.log('service after post', service.ways.length);
      $log.log('way created');
      let way = res.data;
      service.ways.unshift(way);
      console.log('service after unshift', service.ways.length);
      return way;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchWays = function(way) {
    $log.debug('wayService.createWay');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/way` //eslint-disable-line
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
      $log.log('ways fetched');
      service.ways = res.data;
      return service.ways;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.getStateOfWays = function() {
    return this.ways;
  };


  return service;
}

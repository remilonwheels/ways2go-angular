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

  service.fetchWays = function() {
    $log.debug('wayService.fetchWays');

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

      return $http.get(url, way, config);
    })
    .then( res => {
      $log.log('ways fetched');

      angular.copy(res.data, service.ways); //eslint-disable-line
      // service.ways = res.data;

      console.log('service.ways after angular copy', service.ways);
      return service.ways;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  service.getWays = function() {
    $log.log('wayService.getWays');
    return service.ways;
  };
  return service;
}

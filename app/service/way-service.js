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

      console.log('service ways before post', service.ways);

      return $http.post(url, way, config);
    })
    .then( res => {
      console.log('service after post', service.ways);
      $log.log('way created');
      let way = res.data;
      service.ways.unshift(way);
      console.log('service after unshift', service.ways);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.editWay = function(way) {
    $log.debug('wayService.editWay');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/way/${way._id}` //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      console.log('way before put', way);

      return $http.put(url, way, config);
    })
    .then( res => {
      $log.log('way edited');
      let way = res.data;
      // service.ways.unshift(way);
      console.log('way after post', way);
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

      return $http.get(url, config);
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

  service.deleteWay = function(wayID) {
    $log.debug('wayService.deleteWay');

    console.log('way before delete', wayID);
    console.log('length before delete', service.ways.length);

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/way/${wayID}` //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('way deleted');
      service.ways.splice(service.ways.map( way => way._id).indexOf(wayID),1);
      console.log('length after delete', service.ways.length);
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

  service.getOneWay = function(wayID) {
    $log.log('wayService.getOneWay');

    for (let w in service.ways) {
      if (service.ways[w]._id === wayID) {
        return service.ways[w];
      }
    }
    return;
  };

  return service;
}

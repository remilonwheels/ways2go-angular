'use strict';

module.exports = ['$q', '$log', '$http', '$window', '$location', '$mdToast', authService];

function authService($q, $log, $http, $window, $location, $mdToast) {
  $log.debug('authService');

  let service = {};
  let token = null;
  service.isAuthorized = false;

  service.authorize = function() {
    console.log('in authorize', service.isAuthorized);
    if (service.isAuthorized) return $q.resolve();

    $mdToast.showSimple('Please login');
    $location.url('/');
    console.log('hit');
    return $q.reject();
  };

  const setToken = (_token) => {
  // function setToken(_token) {
    $log.debug('authService.setToken');

    if (!_token) {
      return $q.reject(new Error('no token'));
    }

    service.isAuthorized = true;
    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  };

  service.getToken = function() {
    $log.debug('authService.getToken');

    if (token) {
      service.isAuthorized = true;
      return $q.resolve(token);
    }

    token = $window.localStorage.getItem('token');
    if (token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  service.signup = function(user) {
    $log.debug('authService.signup');

    let url = `${__API_URL__}/api/signup`; //eslint-disable-line
    $log.log('url', url);
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.log('success:', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error('failure:', err.message);
      return $q.reject(err);
    });
  };

  service.login = function(user) {
    $log.debug('authService.login');

    let url = `${__API_URL__}/api/signin` //eslint-disable-line
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('success:', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateUser = function(user) {
    $log.debug('authService.updateUser');

    return service.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/user` //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, user, config);
    })
    .then( res => {
      $log.log('account updated');
      return res.data;
    })
    .catch( err => {
      $log.error(err.data);
      return $q.reject(err);
    });
  };

  service.deleteUser = function() {
    $log.debug('authService.deleteUser');

    return service.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/user`; //eslint-disable-line
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('account removed');
      return res.data;
    })
    .catch( err => {
      $log.error(err.data);
      return $q.reject(err);
    });
  };

  service.logout = function() {
    $log.debug('authService.logout');

    $window.localStorage.removeItem('token');
    service.isAuthorized = false;
    token = null;
    return $q.resolve();
  };

  return service;
}

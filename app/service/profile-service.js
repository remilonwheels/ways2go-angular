'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', profileService];

function profileService($q, $log, $http, Upload, authService) {
  $log.debug('profileService');

  let service = {};
  service.profile = {};

  service.createProfile = function(profile) {
    $log.debug('profileService.createProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile` //eslint-disable-line
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          displayName: profile.displayName,
          fullName: profile.fullName,
          address: profile.address,
          bio: profile.bio,
          photo: profile.photo
        }
      });
    })
    .then( res => {
      $log.log('profile creation success');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateProfile = function(profile) {
    $log.debug('profileService.updateProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile`; //eslint-disable-line

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      return Upload.upload({
        url,
        headers,
        method: 'PUT',
        data: {
          displayName: profile.displayName,
          fullName: profile.fullName,
          address: profile.address,
          bio: profile.bio,
          photo: profile.photo
        }
      });
    })
    .then( res => {
      $log.log('profile updated successfully');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchProfile = function() {
    $log.debug('profileService.updateProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile`; //eslint-disable-line

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      return $http.get(url, {headers: headers});
    })
    .then( res => {
      $log.log('profile retrieved');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchProfileByID = function(profileID) {
    $log.debug('profileService.updateProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${profileID}`; //eslint-disable-line

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      return $http.get(url, {headers: headers});
    })
    .then( res => {
      $log.log('profile retrieved');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteProfile = function() {
    $log.debug('profileService.deleteProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile`; //eslint-disable-line

      let headers = {
        Authorization: `Bearer ${token}`
      };

      return $http.delete(url, headers);
    })
    .then( res => {
      $log.log(res.status);
      for (var key of service.profile) {
        delete service.profile[key];
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  $log.log('service.profile', service.profile);
  return service;
}

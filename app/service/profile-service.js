'use strict';

module.exports = ['$q', '$log', '$http', '$mdSidenav', 'Upload', 'authService', profileService];

function profileService($q, $log, $http, $mdSidenav, Upload, authService) {
  $log.debug('profileService');

  let service = {};
  service.profile = {};
  service.allProfiles = [];

  service.toggleProfile = function() {
    $mdSidenav('left').toggle();
  };

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
    $log.debug('profileService.fetchProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/user`; //eslint-disable-line

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
      $log.log('service.profile', service.profile);
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

      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log(res.status);
      return res.status;
      // for (var key of service.profile) {
      //   delete service.profile[key];
      // }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  // profileRouter.get('/api/profile', bearerAuth, function(req, res, next) {
  // debug('GET: /api/profile');
  //
  // Profile.find({})
  // .then( profiles => {
  //   if (!profiles) return next(createError(404, 'no profiles available'));
  //   res.json(profiles);
  // })
  // .catch(next);
  // });

  service.fetchAllProfiles = function(){
    $log.debug('profileService.fetchAllProfiles');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile`; //eslint-disable-line

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
      $log.log('all profiles retrieved');
      service.allProfiles = res.data;
      return service.allProfiles;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}

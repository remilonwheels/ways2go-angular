'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'profileService', 'authService', reviewService];

function reviewService($q, $log, $http, Upload, profileService, authService) {
  $log.debug('reviewService');

  let service = {};

  service.review = {};

  service.createReview = function(profile, way, review) {
    $log.debug('reviewService.createReview');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/wayerz/${profile.profileID}/review` //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.post(url, profile, way, review, config);
    })
    .then( res => {
      $log.log('review creation success');
      service.profile = res.data;
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  $log.log('service.review', service.review);
  return service;
}

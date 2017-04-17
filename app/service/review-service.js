'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'profileService', 'wayService', 'authService', reviewService];

function reviewService($q, $log, $http, Upload, profileService, wayService, authService) {
  $log.debug('reviewService');

  let service = {};

  service.review = {};
  service.reviews = [];

  service.createReview = function(profile, way, review) {
    $log.debug('reviewService.createReview');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/wayerz/58f28a808907e600110fdb73/review` //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.post(url, review, config);
    })
    .then( res => {
      $log.log('review creation success');
      let review = res.data;
      service.reviews.unshift(review);
      return review;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateReview = function(review) {
    $log.debug('reviewService.updateReview');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/review/:id` //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.put(url, review, config);
    })
    .then( res => {
      $log.log('review edit success');
      this.review = res.data;
      $log.log(this.review);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}

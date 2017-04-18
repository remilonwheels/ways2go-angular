'use strict';

require('./_star-rating.scss');

module.exports = {
  template: require('./star-rating.html'),
  controller: ['$log', 'profileService', SrarRatingController],
  controllerAs: 'starRatinglCtrl'
};

var profile.avgRating;


    function RatingController() {
      this.rating1 = 5;
      this.rating2 = 2;
      this.isReadonly = true;
      this.rateFunction = function(rating) {
        console.log('Rating selected: ' + rating);
      };
    }

function starRating() {
  return {
    restrict: 'EA',
    template:
    scope: {
      ratingValue: '=ngModel',
      max: '=?', // optional (default is 5)
      onRatingSelect: '&?',
      readonly: '=?'
    },
    link: function(scope, element, attributes) {
      if (scope.max == undefined) {
        scope.max = 5;
      }
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        if (scope.readonly == undefined || scope.readonly === false){
          scope.ratingValue = index + 1;
          scope.onRatingSelect({
            rating: index + 1
          });
        }
      };
      scope.$watch('ratingValue', function(oldValue, newValue) {
        if (newValue) {
          updateStars();
        }
      });
    }
  };
}






// let starRating = {firstStar: null, secondStar: null, thirdStar: null, fourthStar: null, fifthStar: null};
//
// if (!profile.avgRating) { }; /* 0 */
// if (!profile.avgRating <= .5) {starRating = {firstStar: .5, secondStar: null, thirdStar: null, fourthStar: null, fifthStar: null}}; /* .5 */
//
// if (profile.avgRating > .5 && profile.avgRating <= 1) {starRating = {firstStar: 1, secondStar: null, thirdStar: null, fourthStar: null, fifthStar: null}}; /* 1 */
//
// if (profile.avgRating > 1 && profile.avgRating <= 1.5) {starRating = {firstStar: 1, secondStar: .5, thirdStar: null, fourthStar: null, fifthStar: null}}; /* 1.5 */
//
// if (profile.avgRating > 1.5 && profile.avgRating <= 2) {starRating = {firstStar: 1, secondStar: 1, thirdStar: null, fourthStar: null, fifthStar: null}}; /* 2 */
//
// if (profile.avgRating > 2 && profile.avgRating <= 2.5) {starRating = {firstStar: 1, secondStar: 2, thirdStar: null, fourthStar: null, fifthStar: null}}; /* 2.5 */
//
// if (profile.avgRating > 2.5 && profile.avgRating <= 3) {starRating = {firstStar: 1, secondStar: 1, thirdStar: 1, fourthStar: null, fifthStar: null}}; /* 3 */
//
// if (profile.avgRating > 3 && profile.avgRating <= 3.5) {starRating = {firstStar: 1, secondStar: 1, thirdStar: null, fourthStar: .5, fifthStar: null}}; /* 3.5 */
//
// if (profile.avgRating > 3.5 && profile.avgRating <= 4) {starRating = {firstStar: 1, secondStar: 1, thirdStar: 1, fourthStar: 1, fifthStar: null}}; /* 4 */
//
// if (profile.avgRating > 4 && profile.avgRating <= 4.5) {starRating = {firstStar: 1, secondStar: 1, thirdStar: 1, fourthStar: 1, fifthStar: .5}}; /* 4.5 */
//
// if (profile.avgRating > 4.5 && profile.avgRating <= 5) {starRating = {firstStar: 1, secondStar: 1, thirdStar: 1, fourthStar: 1, fifthStar: 1}}; /* 5 */

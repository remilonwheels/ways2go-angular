'use strict';

module.exports = function() {
  return {
    restrict: 'EA',
    template: require('./star-rating.html'),
    scope: {
      ratingValue: '=ngModel',
      max: '=5',
      onRatingSelect: '&5',
      readonly: '=5'
    }
  };
};

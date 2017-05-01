'use strict';

module.exports = function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('$md.dragend', function() {
        console.info('Drag Ended');
        console.log('this is radius directive', this);
      });
    }
  };
};

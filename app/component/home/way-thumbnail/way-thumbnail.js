'use strict';

require('./_way-thumbnail.scss');

module.exports = {
  template: require('./way-thumbnail.html'),
  controller: ['$log', 'wayService', WayThumbnailController],
  controllerAs: 'waythumbnailCtrl'
};

function WayThumbnailController($log, wayService) { // eslint-line-disable
  $log.debug('WayThumbnailController');
}

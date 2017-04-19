'use strict';

require('./_way-thumbnail.scss');

module.exports = {
  template: require('./way-thumbnail.html'),
  controller: ['$log', 'wayService', WayThumbnailController],
  controllerAs: 'waythumbnailCtrl'
};

function WayThumbnailController($log, wayService) { // eslint-line-disable
  $log.debug('WayThumbnailController');

  this.name = 'Cool way';
  this.startLocation = '123 code way';
  this.endLocation = '678 same street';
  this.startTime = '10:am';
}
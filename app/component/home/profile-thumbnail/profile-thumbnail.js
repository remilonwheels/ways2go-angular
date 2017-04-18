'use strict';

require('./_profile-thumbnail.scss');

module.exports = {
  template: require('./profile-thumbnail.html'),
  controller: ['$log', 'profileService', ProfileThumbnailController],
  controllerAs: 'profilethumbnailCtrl'
};

function ProfileThumbnailController($log, profileService) { // eslint-line-disable
  $log.debug('ProfileThumbnailController');
}

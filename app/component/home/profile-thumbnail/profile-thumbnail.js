'use strict';

require('./_profile-thumbnail.scss');

module.exports = {
  template: require('./profile-thumbnail.html'),
  controller: ['$log', 'profileService', ProfileThumbnailController],
  controllerAs: 'profilethumbnailCtrl'
};

function ProfileThumbnailController($log, profileService) { // eslint-line-disable
  $log.debug('ProfileThumbnailController');

  this.photo = 'http://placehold.it/100x100';
  this.bio = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod';
}

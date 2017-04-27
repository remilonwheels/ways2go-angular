'use strict';

require('./_way-thumbnail.scss');

module.exports = {
  template: require('./way-thumbnail.html'),
  controller: ['$log', 'wayService','profileService', WayThumbnailController],
  controllerAs: 'waythumbnailCtrl'
};

function WayThumbnailController($log, wayService, profileService) { // eslint-line-disable
  $log.debug('WayThumbnailController');


  profileService.fetchProfile()
  .then( profile => {
    this.profile = profile;
    this.myWays = wayService.getWays().filter( way => way.profileID === this.profile._id);
    console.log('my ways', this.myWays);
  });
}

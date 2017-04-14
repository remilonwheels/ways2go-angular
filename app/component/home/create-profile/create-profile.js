'use strict';

require('./_create-profile.scss');

module.exports = {
  template: require('./create-profile.html'),
  controller: ['$log', 'profileService', CreateProfileController],
  controllerAs: 'createProfileCtrl'
};

function CreateProfileController($log, profileService) {
  $log.debug('CreateProfileController');

  this.profile = {};

  this.createProfile = function() {
    profileService.createProfile(this.profile)
    .then( () => {
      this.profile.displayName = null;
      this.profile.fullName = null;
      this.profile.address = null;
      this.profile.bio = null;
      this.profile.photo = null;
    });
  };
}

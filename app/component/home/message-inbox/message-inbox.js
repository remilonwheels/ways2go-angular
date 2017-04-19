'use strict';

require('./_message-inbox.scss');

module.exports = {
  template: require('./message-inbox.html'),
  controller: ['$log', 'messageService', MessageInboxController],
  controllerAs: 'createProfileCtrl'
};

function MessageInboxController($log, messageService) {
  $log.debug('MessageInboxController');

  this.message = {};

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

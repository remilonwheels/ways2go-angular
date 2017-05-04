'use strict';

require('./_view-one-profile.scss');

const createMessageDialog = require('../../message/profile-message/profile-message.js');

module.exports = {
  template: require('./view-one-profile.html'),
  controller: ['$log', '$mdDialog', '$mdMedia', '$mdToast','wayService', '$scope', '$window', 'messageService', 'profileService', 'profile',  ViewOneProfileController],
  controllerAs: 'viewOneProfileCtrl'
};

function ViewOneProfileController($log, $mdDialog, $mdMedia, $mdToast, wayService, $scope, $window, messageService, profileService, profile) {

  this.profile = profile;
  this.isLoading = false;

  this.sendMessage = function($event, bindFlag, msgRecipient) {
    $log.debug('viewOneProfileCtrl.sendMessage');

    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      resolve: {
        msgRecipient: function() {
          return msgRecipient;
        }
      }
    };

    $mdDialog.show(Object.assign(createMessageDialog, dialogConfig));
  };

  this.linkMediaSite = function(site, user) {
    return $window.open(`https://www.${site}.com/${user}`, '_blank');
  };

  this.linkGoogle = function(user) {
    return $window.open(`https://www.plus.google.com/${user}`, '_blank');
  };

  this.linkedIn = function(user) {
    return $window.open(`https://www.linkedin.com/in/${user}`, '_blank');
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };
}

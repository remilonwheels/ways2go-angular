'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', 'profileService', EditProfileController],
  controllerAs: 'editProfileCtrl'
};

function EditProfileController($log, profileService) {

};

'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', HomeController]; //TODO: Add service dependencies

function HomeController($log, $rootScope) {
  $log.debug('HomeContoller');

  //this.fetchProfile = function() {
  //profileService.fetchProfile()
  // }

  //TODO: Home View Controller
}

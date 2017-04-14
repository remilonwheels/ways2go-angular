'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootScope', LandingController];

function LandingController($log, $location) {
  $log.debug('LandingController');

  let url = $location.url() === '/join#signup' || url === '/join';
}

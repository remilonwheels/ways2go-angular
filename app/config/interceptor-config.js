'use strict';

module.exports = ['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptorService');
}];

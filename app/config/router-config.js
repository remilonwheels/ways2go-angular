'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/join#signup');
  $urlRouterProvider.when('/', '/join#signup');
  $urlRouterProvider.when('/signup', '/join#signup');
  $urlRouterProvider.when('/login', '/join#login');

  let states = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    },
    {
      name: 'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl'
    },
    {
      name: 'message',
      url: '/message',
      template: require('../view/message/message.html'),
      controller: 'MessageController',
      controllerAs: 'messageCtrl'
    },
    {
      name: 'way',
      url: '/way',
      template: require('../view/way/way.html'),
      controller: 'WayController',
      controllerAs: 'wayCtrl'
    },
    {
      name: 'test',
      url: '/test',
      template: require('../view/test/test.html'),
      controller: 'TestController',
      controllerAs: 'testCtrl'
    },
    {
      name: 'resolve',
      url: '/resolve',
      template: require('../view/resolve/resolve.html'),
      controller: 'ResolveController',
      controllerAs: 'resolveCtrl',
      resolve: {
        authService: 'authService',
        profileService: 'profileService',
        testresolve: function() {
          return 'ayo';
        },
        myprofile: function(profileService, $q, $location, $mdToast) {
          // return profileService.fetchProfile()
          // .then( profile => {
          //   console.log('resolve profile', profile);
          //   return profile;
          // })
          // .catch(e => {
          //   console.log(e);
          //   console.log('didnt login');
          //   $mdToast.showSimple('Please login');
          //   $location.url('/');
          //   return $q.reject();
          // });

          return;
        },
      },
    }
  ];

  const stateConfig = {
    resolve: {
      isAuthorized
    },
    onEnter
  };
  states.forEach( state => {
    if (state.name === 'landing') $stateProvider.state(state);
    else $stateProvider.state(Object.assign(state, stateConfig));
  });
}

function isAuthorized($window) {
  if($window.localStorage.token) return true;
  return false;
}

function onEnter(isAuthorized, $location) {
  if (!isAuthorized) $location.url('/');
}

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dealsapp', ['ionic','ngCordova','ngCordovaOauth'])


 .run(function($ionicPlatform,$ionicLoading) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });

})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    console.log("setting config");
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider

    // State to represent Login View
    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl',
        })


    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html",
      })

    // Each tab has its own nav history stack:

    .state('tab.camera', {
        url: '/camera',
        views: {
            'tab-camera': {
                templateUrl: 'templates/tab-camera.html',
                controller: 'CameraCtrl'
            }
        }
    })

    .state('tab.list', {
        url: '/list',
        views: {
            'tab-list': {
                templateUrl: 'templates/tab-list.html',
                controller: 'ListCtrl'
            }
        }
    })
    .state('tab.rate',{
        url:'/rate',
        views: {
            'tab-rate': {
                templateUrl: 'templates/tab-rate.html',
                controller: 'RateCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

})



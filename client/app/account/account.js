'use strict';

angular.module('jrnyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        data: {
          css: 'assets/stamp/css/styles.css'
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl',
        data: {
          css: 'assets/stamp/css/styles.css'
        }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/account/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('my-jrnys', {
        url: '/my-jrnys',
        templateUrl: 'app/account/my-jrnys/my-jrnys.html',
        controller: 'myJrnysCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('local-signup', {
        url: '/local-signup',
        templateUrl: 'app/account/local-signup/local-signup.html',
        controller: 'localSignupCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/account/profile/profile/profile.html',
        controller: 'profileCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('edit-profile', {
        url: '/edit-profile',
        templateUrl: 'app/account/profile/edit-profile/edit-profile.html',
        controller: 'editProfileCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('about-you', {
        url: '/about-you',
        templateUrl: 'app/account/profile/about-you/about-you.html',
        controller: 'aboutYouCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      });
  });

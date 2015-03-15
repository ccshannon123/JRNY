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
            });
    });
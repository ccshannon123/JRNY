'use strict';

angular.module('jrnyApp').config(function ($stateProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'app/main/home/home.html',
            controller: 'HomeCtrl',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('help-center', {
            url: '/help-center',
            templateUrl: 'app/main/help-center/help-center.html',
            //controller: 'TravelerCtrl',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('traveler-faqs', {
            url: '/help-center/traveler-faqs',
            templateUrl: 'app/main/help-center/traveler-faqs/traveler-faqs.html',
            controller: 'TravelerCtrl',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('local-faqs', {
            url: '/help-center/local-faqs',
            templateUrl: 'app/main/help-center/local-faqs/local-faqs.html',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('privacy-policy', {
            url: '/privacy-policy',
            templateUrl: 'app/main/privacy-policy/privacy-policy.html',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('team', {
            url: '/team',
            templateUrl: 'app/main/team/team.html',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('local-home', {
            url: '/local-home',
            templateUrl: 'app/main/local-home/local-home.html',
            controller: 'SignupCtrl',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'app/main/contact/contact.html',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('press', {
            url: '/press',
            templateUrl: 'app/main/press/press.html',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('jobs', {
            url: '/jobs',
            templateUrl: 'app/main/jobs/jobs.html',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('destination-search', {
            url: '/destination-search',
            templateUrl: 'app/main/destination-search/destination-search.html',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        })
        .state('local-search', {
            url: '/local-search',
            templateUrl: 'app/main/local-search/local-search.html',
            data: {
                css: 'assets/stamp/css/styles.css'
            }
        });


});
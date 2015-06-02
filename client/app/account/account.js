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
        url: '/profile/:id',
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
      })
      .state('reviews-profile', {
        url: '/reviews-profile',
        templateUrl: 'app/account/profile/reviews-profile/reviews-profile.html',
        controller: 'reviewsProfileCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('verifications', {
        url: '/verifications',
        templateUrl: 'app/account/profile/verifications/verifications.html',
        controller: 'verificationsCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide', {
        url: '/survival-guide',
        templateUrl: 'app/account/profile/survival-guide/survival-guide.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide.summary', {
        url: '/summary',
        templateUrl: 'app/account/profile/survival-guide/summary.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide.before_arriving', {
        url: '/before_arriving',
        templateUrl: 'app/account/profile/survival-guide/before_arriving.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide.getting_here', {
        url: '/getting_here',
        templateUrl: 'app/account/profile/survival-guide/getting_here.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide.accommodation', {
        url: '/accommodation',
        templateUrl: 'app/account/profile/survival-guide/accommodation.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide.transportation', {
        url: '/transportation',
        templateUrl: 'app/account/profile/survival-guide/transportation.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide.money', {
        url: '/money',
        templateUrl: 'app/account/profile/survival-guide/money.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide.weather_seasons', {
        url: '/weather_seasons',
        templateUrl: 'app/account/profile/survival-guide/weather_seasons.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('survival-guide.more_info', {
        url: '/more_info',
        templateUrl: 'app/account/profile/survival-guide/more_info.html',
        controller: 'survivalCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('notification', {
        url: '/notifications',
        templateUrl: 'app/account/account/notification/notification.html',
        controller: 'notificationCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('message_inbox', {
        url: '/message_inbox',
        templateUrl: 'app/account/message/inbox/inbox.html',
        controller: 'inboxCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('message_write', {
        url: '/message_write/:id',
        templateUrl: 'app/account/message/compose/compose.html',
        controller: 'composeCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('message_sent', {
        url: '/message_sent',
        templateUrl: 'app/account/message/sent/sent.html',
        controller: 'sentCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('account-settings', {
        url: '/account-settings',
        templateUrl: 'app/account/account/user-setting/user-setting.html',
        controller: 'usersettingCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('jrny-basics', {
        url: '/jrny-basics',
        templateUrl: 'app/account/traveler-survey/jrny-basics/jrny-basics.html',
        controller: 'jrnybasicsCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('travel-companions', {
        url: '/travel-companions',
        templateUrl: 'app/account/traveler-survey/travel-companions/travel-companions.html',
        controller: 'travelcompanionCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      })
      .state('interest-preference', {
        url: '/interest-preference',
        templateUrl: 'app/account/traveler-survey/interest-preference/interest-preference.html',
        controller: 'interestpreferenceCtrl',
        authenticate: true,
        data: {
          css: 'assets/endless/css/endless.css'
        }
      });
  });

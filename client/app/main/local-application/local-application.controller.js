'use strict';

angular.module('jrnyApp').controller('localapplicationCtrl', function ($scope, $http, $location, $stateParams, Auth, Upload) {

	$scope.getCurrentUser = Auth.getCurrentUser;
	
	$scope.m_gen = "male";
	$scope.m_pn1 = "";
	$scope.m_pn2 = "";
	$scope.m_lang = "English";
	$scope.m_exp = "Food";
	$scope.m_langList = [];
	$scope.m_expList = [];

	$scope.m_wdyl = "";
	$scope.m_hwyd = "";
	$scope.m_wswk = "";

	$scope.m_file_photo;
	$scope.m_file_cover_photo;
	$scope.m_filename1 = "";
	$scope.m_filename2 = "";

	$scope.m_fb = "";
	$scope.m_tw = "";
	$scope.m_in = "";

	$scope.m_is_error = 0;
	$scope.m_msg = "";

	$scope.m_expertise = ['Food', 'Outdoors', 'Luxury'];
	$scope.m_levels = ['Beginner', 'Limited Working', 'Professional', 'Native/Billingual'];
    $scope.m_languageList = ['English', 'Arabic', 'French', 'German', 'Hindi', 'Italian', 'Japanese', 'Korean', 'Mandarin', 'Portuguese', 'Russian', 'Spanish', 'Other'];

	$scope.finish = function() {
		var uid = $stateParams.id;
		if(uid == "1")
			uid = $scope.getCurrentUser()._id;
		$http.post('/api/user_review/save_local', {
			uid: uid,
			gen: $scope.m_gen,
			pn1: $scope.m_pn1,
			pn2: $scope.m_pn2,
			wdyl: $scope.m_wdyl,
			hwyd: $scope.m_hwyd,
			wswk: $scope.m_wswk,
			fn1: $scope.m_filename1,
			fn2: $scope.m_filename2,
			languages: $scope.m_langList

		}).
          success(function(data, status, headers, config) {
          	$scope.m_is_error = 1;
			$scope.m_msg = "Local application successfully saved.";
			window.scrollTo(0, 0);
          }).
          error(function(data, status, headers, config) {
          });


	};

	$scope.addLanguage = function() {
		for(var i = 0; i < $scope.m_langList.length; i++) {
			if($scope.m_langList[i].lang == $scope.m_lang)
				return;
		}
		$scope.m_langList.push({lang: $scope.m_lang, reading: 'Beginner', writing: 'Beginner'});
	};

	$scope.removeLanguage = function(lang) {
		$scope.m_langList.splice($scope.m_langList.indexOf(lang), 1);
	};

	$scope.addExpertise = function() {
		if($scope.m_expList.length == 3) {
			return;
		}
		for(var i = 0; i < $scope.m_expList.length; i++) {
			if($scope.m_expList[i].expertise == $scope.m_exp)
				return;
		}
		$scope.m_expList.push({expertise: $scope.m_exp});
	};

	$scope.removeExpertise = function(exp) {
		$scope.m_expList.splice($scope.m_expList.indexOf(exp), 1);
	};

	$scope.$watch('m_file_cover_photo', function () {

        $scope.upload($scope.m_file_cover_photo, 2);
    });

	$scope.$watch('m_file_photo', function () {

        $scope.upload($scope.m_file_photo, 1);
    });

    $scope.upload = function (files, tp) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                Upload.upload({
                    url: '/api/users/upload_cover',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                	if(tp == 1)
                    	$scope.m_filename1 = data.img;
                    else if(tp == 2)
                    	$scope.m_filename2 = data.img;
                   
                }).error(function (err) {
                    console.log(err);
                });
            }
        }
    };


});
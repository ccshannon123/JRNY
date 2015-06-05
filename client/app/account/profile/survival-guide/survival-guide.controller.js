'use strict';

angular.module('jrnyApp').controller('survivalCtrl', function ($scope, User) {
	$scope.m_font_bold = new Array('bold', '', '', '', '', '', '', '');

	$scope.go_page = function(idx) {
		for(var i = 0; i < 8; i++)
			$scope.m_font_bold[i] = '';
		$scope.m_font_bold[idx] = 'bold';
	};
});

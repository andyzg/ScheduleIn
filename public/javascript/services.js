angular.module('userServices', ['ngResource']).
factory('User', function($resource) {
    return $resource('user', {}, {
      query: { method: 'GET', isArray: true }
    });
  });
/*	.factory('Schedule', function($resource) {
		return $resource('/schedule', {}, {
			query: { method: 'GET', isArray: true }
		});
	});*/
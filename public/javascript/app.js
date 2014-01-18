angular.module('schedulein', [])
	.config(['$routeProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', 
				{
					templateUrl: 'partials/login.html',
					controller: LoginCtrl 
				}).
			when('/list', 
				{
					templateUrl: 'partials/list.html',
					controller: JobListCtrl 
				}).
			when('/list/new', 
					{ 
						templateUrl: 'partials/new.html',
						controller: NewJobCtrl 
					}).
			when('/list/:profileId', 
					{ 
						templateUrl: 'partials/profile.html', 
						controller: ProfileCtrl
					}).
			when('/list/:job', 
					{ 
						templateUrl: 'partials/job.html',
						controller: JobSchedCtrl 
					}).
			otherwise({ 
				redirectTo: '/list' 
				});
          }]);
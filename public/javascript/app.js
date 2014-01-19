angular.module('schedulein', ['userServices'])
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
			when('/new', 
					{ 
						templateUrl: 'partials/new.html',
						controller: NewJobCtrl 
					}).
			when('/:profileId', 
					{ 
						templateUrl: 'partials/profile.html', 
						controller: ProfileCtrl
					}).
			when('/job/:title', 
					{ 
						templateUrl: 'partials/job.html',
						controller: JobSchedCtrl 
					}).
			otherwise({ 
				redirectTo: '/login' 
				});
          }]);
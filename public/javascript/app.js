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
          // Code below from 
          // http://stackoverflow.com/questions/11541695/angular-js-redirecting-to-a-certain-route-based-on-condition
/*          .run(function($rootScope, $location) { 
        	  $rootScope.$on("$routeChangeStart", function(event, next, current) {
        		 if ( $rootScope.loggedUser === null ) {
        			 if ( next.$route.templateUrl === "partials/login.html" ) {
        				 
        			 }
        			 else {
        				 $location.path("/login");
        			 }
        		 } 
        	  });
          });*/
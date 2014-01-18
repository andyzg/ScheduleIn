function LoginCtrl($scope, $http, $location) {
	if ( $scope.loggedIn === 1 ) {
		$location.path('/list');
	}
	$scope.loggedIn = 0;
	
	$scope.form = {};
	$scope.logIn = function() {
		$http.post('/login', $scope.form).
		success(function(data, status, headers, config) {
			$scope.loggedIn = 1;
			$scope.jobs = data.jobs;
			$location.path('/list');
		}).
		error(function(data, status, headers, config) {
			console.log("Invalid login");
			$scope.loginMessage = "Invalid";
		});
	};
	
	$scope.signUp = function() {
		$http.post('/signUp', $scope.newUser).
		success(function(data, status, headers, config) {
			$scope.jobs = data.jobs;
			$location.path('/list');
		}).
		error(function(data, status, headers, config) {
			console.log("Invalid Sign up");
			$scope.signUpMessage = "Invalid";
		});
	};
}

function JobListCtrl($scope, $location) {
	// Routing controls for each controller
	if ( $scope.loggedIn === 0 ) {
		$location.path('/login');
	}
	$scope.logOut = loggedOut($scope);
}

function NewJobCtrl($scope, $location) {
	// Routing controls for each controller
	if ( $scope.loggedIn === 0 ) {
		$location.path('/login');
	}
	$scope.logOut = loggedOut($scope);
}

function ProfileCtrl($scope, $location) {
	// Routing controls for each controller
	if ( $scope.loggedIn === 0 ) {
		$location.path('/login');
	}
	$scope.logOut = loggedOut($scope);
}

function JobSchedCtrl($scope, $location) {
	// Routing controls for each controller
	if ( $scope.loggedIn === 0 ) {
		$location.path('/login');
	}
	$scope.logOut = loggedOut($scope);
}

var loggedOut = function($scope) {
	$scope.loggedIn = 0;
}
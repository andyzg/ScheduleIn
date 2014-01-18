function LoginCtrl($scope, $http, $location) {
	$scope.form = {};
	$scope.logIn = function() {
		$http.post('/login', $scope.form).
		success(function(data, status, headers, config) {
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
			$scope.loginMessage = "Invalid";
		});
	};
}

function JobListCtrl() {}
function NewJobCtrl() {}
function ProfileCtrl() {}
function JobSchedCtrl() {}
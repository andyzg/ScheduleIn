function LoginCtrl($rootScope, $scope, $http, $location) {
	if ( $rootScope.loggedIn === '1' ) {
		$location.path('/list');
	}
	// Declare as logged in
	$rootScope.loggedIn = '0';
	
	// Used for log in
	$scope.form = {}; 
	
	// Used for sign up
	$scope.newUser = {};
	
	// Event handler for login
	$scope.logIn = function() {
		$http.post('/login', $scope.form).
		success(function(data, status, headers, config) {
			$rootScope.loggedIn = '1';
			$rootScope.user = data[0];
			console.log($rootScope.user.email);
			$location.path('/list');
		}).
		error(function(data, status, headers, config) {
			console.log("Invalid login");
			$scope.loginMessage = "Invalid";
		});
	};
	
	// Event handler for sign up
	$scope.signUp = function() {
		$http.post('/signUp', $scope.newUser).
		success(function(data, status, headers, config) {
			$rootScope.loggedIn = '1';
			$scope.user = data;
			$location.path('/list');
		}).
		error(function(data, status, headers, config) {
			console.log("Invalid Sign up");
			$scope.signUpMessage = "Invalid";
		});
	};
}

function JobListCtrl($rootScope, $scope, $location, User) {
	// Need a routing function
	$scope.user = User.query(function() {
		console.log("OMG");
		console.log($scope.user);
	});
}

function NewJobCtrl($rootScope, $scope, $location, User) {
	var user = User.query();
	// Need a routing function
	
	// Initialize empty schedule
	$scope.schedule = {
		title: '',
		employees: [ { email: '' }, { email: '' }, { email: '' }],
		slots : []
	};
	
	// Add extra blocks for more employees
	$scope.addEmployee = function() {
		$scope.schedule.employees.push({ email: '' });
	};
	
	// Create the schedule and push into both the current User's schedule and 
	// push it into each of the employees with the email
	$scope.createSchedule = function() {
		// Title is mandatory
		if ( $scope.schedule.title === "" || $scope.schedule.title === null ) {
			alert("You must enter a title");
			return;
		}
		console.log("Start query");
		
		var user = User.query(function(user) {
			console.log("Done query");
			// Removing all of those with empty spaces while
			// creating an array with the values
			var temp = $scope.schedule.employees;
			var employees = [];
			for (var i=0; i<temp.length; i++) {
				if ( temp[i] != "" ) {
					employees.push(temp[i]);
				}
			}
			$scope.schedule.employees = employees;
			
			// For each employee added, add to respective employee from 
			// database that has the same email (brute force method)
			
			console.log("Emptied the array from empty elements");
			user.forEach(function(data) {
				for ( var i = 0; i < employees.length; i++ ) {
					if ( data.email == employees[i] ) {
						// Add the title of the schedule to the user if they were added
						data.jobs.push($scope.schedule.title);
						employees.splice(i--, 1);
						console.log(data.email + " is non existent");
						break;
					}
				}
			});
			
			console.log("Done appending jobs to users");
			// If the employee email doesn't exist, remove them before 
			// pushing into the User's schedule for jobs
			if ( employees.length != 0) {
				for ( i in employees ) {
					for ( var i = 0; i < $scope.schedule.employees.length; i++ ) {
						if ( $scope.schedule.employees[i] == i ) {
							console.log("Removing " + $scope.schedule.employees[i]);
							$scope.schedule.employees.splice(i, 1);
							break;
						}
					}
				}
			}
			
			console.log("Ensured that there's no emails that don't exist");
			
			var currentUser = function() {
				user.forEach(function(data) {
					if ($rootScope.user.email == data.email) {
						return data;
					}
				});
			};
			
			// Add this schedule into the user's schedule array
			currentUser.schedule.push($scope.schedule, function() {
				console.log("Done pushing the new schedule");
				User.save(function(err, response) {
					if (err) {
						callback(err);
					}
					else {
						console.log("Successfully saved the schedule");
						$location.path('/list');
					}
				});
			});
		});
	};
      
}

function ProfileCtrl($scope, $location) {
	// Need a routing function
}

function JobSchedCtrl($scope, $location) {
	// Need a routing function
}

function loggedOut($scope, $location) {
	// $scope.loggedIn = '0';
	$location.path('/');
}
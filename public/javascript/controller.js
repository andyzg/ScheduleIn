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
			$rootScope.user = data[0];
			$location.path('/list');
		}).
		error(function(data, status, headers, config) {
			console.log("Invalid Sign up");
			$scope.signUpMessage = "Invalid";
		});
	};
}

function JobListCtrl($rootScope, $scope, $location, User) {
	$scope.user = $rootScope.user;
	console.log($scope.user);
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
		
		$scope.users = User.query(function(user) {
			console.log($scope.users);
			console.log("Done query");
			// Removing all of those with empty spaces while
			// creating an array with the values
			var temp = $scope.schedule.employees;
			var employees = [];
			for (var i=0; i<temp.length; i++) {
				if ( temp[i].email !== "" ) {
					console.log(temp[i].email);
					employees.push(temp[i]);
				}
			}
			$scope.schedule.employees = employees;
			console.log(employees);
			
			// For each employee added, add to respective employee from 
			// database that has the same email (brute force method)
			
			console.log("Emptied the array from empty elements");
			$scope.users.forEach(function(data) {
				for ( var i = 0; i < employees.length; i++ ) {
					if ( data.email == employees[i].email ) {
						console.log("adding " + $scope.schedule.title + " to " + data.email);
						
						// Add the title of the schedule to the user if they were added
						var Job = {
								slots : [],
								title : $scope.schedule.title
						};
						data.jobs.push(Job);
						
						var updatedUser = new User(data);
						updatedUser.$save(function(p, response) {
							console.log("safely added " + updatedUser);
							console.log(updatedUser);
						});
						
						employees.splice(i--, 1);
						console.log(data.email + " is existent");
						break;
					}
				}
			});
			
			console.log("Done appending jobs to users");
			// If the employee email doesn't exist, remove them before 
			// pushing into the User's schedule for jobs
			if ( employees.length != 0 ) {
				for ( i in employees ) {
					for ( var j = 0; j < $scope.schedule.employees.length; j++ ) {
						if ( $scope.schedule.employees[j] == i ) {
							console.log("Removing " + $scope.schedule.employees[j]);
							$scope.schedule.employees.splice(i--, 1);
							break;
						}
					}
				}
			}
			
			console.log("Ensured that there's no emails that don't exist");
			
			// Add this schedule into the user's schedule array
			$rootScope.user.schedule.push($scope.schedule);
			var finalUser = new User($rootScope.user);
			console.log(finalUser);
			finalUser.$save(function(p, response) {
				if (!p.error) {
					console.log("Successfully saved the schedule");
					$location.path('/list');
				}
				else {
					alert("Error");
				}
			});
		});
	};
}

function ProfileCtrl($scope, $location) {
	// Need a routing function
}

function JobSchedCtrl($scope, $location, socket) {
	$scope.chat = [];
	// Need a routing function
	$scope.send = function() {
		socket.emit("message", $scope.msg);
	}
	
	socket.on("chat-msg", function(data) {
		$scope.chat.push($rootScope.user.name.first + " " + $rootScope.user.name.last + " : " + data);
	});
}

function loggedOut($scope, $location) {
	// $scope.loggedIn = '0';
	$location.path('/');
}
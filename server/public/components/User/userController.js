cracklord.controller('UserController', function UserController($state, $scope, USER_ROLES, AuthService, UserSession) {
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;

	$scope.setCurrentUser = function(user) {
		$scope.currentUser = user;
	}

	$scope.userLogout = function() {
		AuthService.logout(UserSession.token)
			.success(function(data, status, headers, config) {
					$scope.currentUser = null;
					UserSession.destroy();
//					$state.go('login');
			})
			.error(function (data, status, headers, config) {
			});
	}
});

cracklord.controller('LoginFormController', function LoginFormController($state, $scope, AuthService, growl, UserSession) {
	$scope.login = {};
	$scope.login.failed = false;

	$scope.processLoginForm = function() {
		var creds = {
			username: $scope.login.username, 
			password: $scope.login.password
		}
		AuthService.login(creds)
			.success(function(data, status, headers, config) {
				UserSession.create(data.token, $scope.login.username, data.role);
				$scope.setCurrentUser($scope.login.username);
				growl.success("Login successful.");
				$state.go('jobs');
			})
			.error(function (data, status, headers, config) {
				growl.error("Login failed.");
			});
	};
});

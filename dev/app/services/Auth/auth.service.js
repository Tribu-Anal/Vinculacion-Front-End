auth.$inject = ['$http', '$cookieStore', '$rootScope'];

function auth ($http, $cookieStore, $rootScope) {
	var service = {
		Login: Login,
		SetCredentials: SetCredentials,
		ClearCredentials: ClearCredentials,
		AccountId: AccountId
	};

	return service;

	function Login (username, password, successCallback, errorCallback) {
       $http.post('http://fiasps.unitec.edu:8085/api/Login', JSON.stringify({ User: username, Password: password }))
            .then(successCallback)
            .catch(errorCallback);
    };
  
    function SetCredentials (token) {  
       $rootScope.globals.token = token;
  
       $http.defaults.headers.common['Authorization'] = token;
       $cookieStore.put('globals', $rootScope.globals);
    };
  
    function ClearCredentials () {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };

	function AccountId(email, successCallback, errorCallback){
		let url = 'http://fiasps.unitec.edu:8085/api/StudentByEmail/';
		$http.post(url,JSON.stringify(email)).then(successCallback)
			.catch(errorCallback); 
	};
}

module.exports = { name: 'auth', srvc: auth };
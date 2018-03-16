myApp.factory('UserFactory', function($http){
  var factory = {};
  var sessionUser = {loggedIn: false};

  factory.getUser = function(callback){
    callback(sessionUser);
  }

  factory.getSession = function(){
    $http.get('/session').success(function(response){
      if(response.status){
        sessionUser = response.sessionUser;
      }else{
        console.log('session not set');
      }
    })
  }
  factory.getSession();

  factory.register = function(user_info, callback){
    $http.post('/register', user_info).success(function(response){
      if(response.status){
        sessionUser = response.sessionUser;
      }
      callback(response);
    })
  }

  factory.login = function(user_info, callback){
    $http.post('/login', user_info).success(function(response){
      if(response.status){
        sessionUser = response.sessionUser;
      }
      callback(response);
    })
  }

  factory.logout = function(callback){
    $http.get('/logout').success(function(response){
      if(response.status){
        sessionUser = response.sessionUser;
      }
      callback(response);
    })
  }

  factory.index = function(callback){
    $http.get('/users').success(function(response){
      if (response.status){
        callback(response);
      }else{
        console.log('error getting users');
      }
    })
  }

  return factory;
})

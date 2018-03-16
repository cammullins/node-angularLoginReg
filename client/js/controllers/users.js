myApp.controller('UsersController', function(UserFactory, $location){
  var self = this;
  self.user;
  this.register = function(){
    self.errors = [];
    UserFactory.register(this.newUser, function(response){
      if (!response.status){
        self.errors.push(response.errors);
      }else{
        self.user = response.sessionUser;
        $location.url('/success');
      }
    })
  }

  this.login = function(){
    UserFactory.login(this.loginUser, function(response){
      if (!response.status){
        self.errors.push(response.errors);
      }else{
        self.user = response.sessionUser;
        $location.url('/success');
      }
    })
  }

  this.logout = function(){
    UserFactory.logout(function(response){
      if (response.status){
        self.user = response.sessionUser;
        $location.url('/');
      }else{
        self.errors.push(response.errors);
      }
    })
  }

UserFactory.getUser(function(user_info){
  self.user = user_info;
  if (!self.user.loggedIn){
    $location.url('/');
  }else{
    $location.url('/success');
  }
})

if (self.user.loggedIn){
  UserFactory.index(function(response){
    if (response.status){
      self.allUsers = response.users;
    }
  })
}

})

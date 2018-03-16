var User = mongoose.model('User');

var sessionUser = {loggedIn: false};

module.exports = (function(){
  return {
    index: function(req, res){
      User.find({}, function(err, users){
        if (err){
          res.json({status: false, errors: "Error retreiving Users"});
        }else{
          res.json({status: true, users: users});
        }
      })
    },
    register: function(req, res){
      User.findOne({email: req.body.email}, function(err, user){
        if (user){
          res.json({status: false, errors: "Email is already in use"});
        }else{
          if (req.body.password == req.body.confirm_password){
            var user = new User({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              password: req.body.password,
            });
            user.save(function(err){
              if (err){
                var errorsArr = [];
                for (var i in err.errors){
                  errorsArr.push(err.errors[i].message);
                }
                res.json({status: false, errors: errorsArr})
              }else{
                sessionUser = {
                  loggedIn: true,
                  user_id: user._id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email
                }
                res.json({status: true, sessionUser: sessionUser})
              }
            })
          }else{
            res.json({status: false, errors: "Passwords must match"});
          }
        }
      })
    },
    login: function(req, res){
      if(req.body.email){
        User.findOne({email: req.body.email}, function(err, user){
          if(err){
            res.json({status: false, errors: "Incorrect Email or Password"});
          }else{
            if(user.validPassword(req.body.password)){
              sessionUser = {
                loggedIn: true,
                user_id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
              }
              res.json({status: true, sessionUser: sessionUser});
            }else{
              res.json({status: false, errors: "Incorrect Email or Password"});
            }
          }
        })
      }else{
        res.json({status: false, errors: "Must provide email"})
      }
    },
    session: function(req, res){
      res.json({status: true, sessionUser: sessionUser});
    },
    logout: function(req, res){
      sessionUser = {loggedIn: false};
      res.json({status: true, sessionUser: sessionUser})
    }
  }
})();

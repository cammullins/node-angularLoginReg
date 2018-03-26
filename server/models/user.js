var bcrypt = require('bcrypt');
var validateEmail = function(email){
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

//mongoose schema setup
var UserSchema = new mongoose.Schema({
  first_name: {type: String, required: true, minlength: 2},
  last_name: {type: String, required: true, minlength: 2},
  email: {type: String, required: true, validate: validateEmail},
  password: {type: String, required: true}
}, {timestamps: true})

//'pre' is a mongo function, work with bcrypt gen salt
UserSchema.pre('save', function(done){
  var user = this;
  if(user.password){
    //start of bcrypt function
    bcrypt.genSalt(10, function(err, salt){
      console.log(salt, 'in pre save function');
      bcrypt.hash(user.password, salt, function(err, hash){
        console.log(hash, 'in pre save function');
        user.password = hash;
        done();
      });
    });
  }
})

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}


mongoose.model('User', UserSchema);

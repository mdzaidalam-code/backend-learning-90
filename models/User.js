const mongoose = require('mongoose');
const bycrypt = require('bycryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email : {
    type : String,
    require : [true, 'Please add a email'],
    unique : true,
    match : [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ , 'please add a valid mail']
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
    enum: ['developer', 'designer', 'engineer', 'manager'],
    lowercase: true
  },
  password:{
    type : String,
    required : [true,'please enter valid password'],
    minlength : [6,'Password must have atleast 6 letter'],
    select : false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    return next();
  }

  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password,salt)
})

module.exports = mongoose.model('User', UserSchema);
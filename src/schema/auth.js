import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema


const authSchema = new Schema({
  name:{
      type: String,
      minLength:3,
      maxLength: 30
  },
  username:{
      type: String,
      required: true,
      minLength:3,
      maxLength: 30
  },
  email: {
      type: String,
      unique: true,
      validate: {
          validator: function (email) {
              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
          },
          message: props => `${props.value} is not a valid email`
      },
      required: [true, 'user email required'],
      minLength:5,
      maxLength: 100
  },
  password: {
      type: String,
      required: true,
      minLength:4,
      maxLength: 25
  },

},{collection: 'users' , versionKey: false, timestaps:true})

// Crypting password
  authSchema.statics.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
  }

  authSchema.statics.comparePassword = async(password, receivedPassword)=>{
    return await bcrypt.compare(password,receivedPassword)
  }

  authSchema.pre("save",async function(next){
    const user = this;
    if(!user.isModified("password")){
      return next();
    }
    const hash = await bcrypt.hash(user.password,10);
    user.password = hash
    next();
  })
const Auth = mongoose.model('User', authSchema);

export default Auth;

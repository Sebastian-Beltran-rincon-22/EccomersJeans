import mongoose from "mongoose";

const PantsSchema = new mongoose.Schema({

name:{
  type: String,
  trim:true
},

price: {
  type: Number,
  trim: true
},

counterPants: {
  type: Number,
  default: 0
},

img:{
  type: String,
  trim: true
},

img2:{
  type: String,
  trim: true
},

img3:{
  type: String,
  trim: true
},

img4:{
  type: String,
  trim: true
},

size: {
  type: String,
  trim: true
},

colors: {
  type: String,
  trim: true
}

})

export default mongoose.model('Pants', PantsSchema);

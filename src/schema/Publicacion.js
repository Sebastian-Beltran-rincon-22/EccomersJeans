import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({

  title: {
    type: String,
    trim: true
  },

  description:{
    type: String,
    trim: true
  },

  price: {
    type: Number,
    trim: true
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

},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.model('Publication', publicationSchema);

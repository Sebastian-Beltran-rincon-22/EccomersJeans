import mongoose from "mongoose";

const Schema = mongoose.Schema

const publicationSchema = new Schema({

  title: {
    type: String,
    trim: true
  },

  description:{
    type:String,
    trim: true
  },

  price: {
    type: String,
    trim: true
  },

  img:{
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

const Publication = mongoose.model('Publication', publicationSchema)

export default Publication


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

  post:{
    ref: "Table",
    type: mongoose.Schema.Types.ObjectId
  }

},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.model('Publication', publicationSchema);

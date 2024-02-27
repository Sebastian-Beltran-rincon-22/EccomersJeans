import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({

  relacionshipPants:{
    ref: "Pants",
    type: mongoose.Schema.Types.ObjectId
  },


})

export default mongoose.model('Table', tableSchema);

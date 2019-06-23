import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    //uuid: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author : {type : String, required: true},
    count : {type: Number}
  },{
    timestamps: true
  }
);

export default mongoose.model('board',boardSchema);
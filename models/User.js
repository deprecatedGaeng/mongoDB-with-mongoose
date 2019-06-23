import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique : true},
    password: { type: String, required: true },
    email: { type: String , unique : true},
    phone : { type: String},
    nickname : { type: String, required: true, unique : true}
  },{
    timestamps: true
  }
);

export default mongoose.model('user',userSchema);
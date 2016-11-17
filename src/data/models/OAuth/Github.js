/**
 * Created by JonirRings on 2016/11/17.
 */
import mongoose, { Schema } from 'mongoose';

const Github = new Schema({
  login_name: String,
  login_id: {
    type:Number,
    required:true
  },
  avatar_url: String,
  nick_name:String,
  user:{
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});
const GithubModel = mongoose.model('GitHub', Github);
export default GithubModel;

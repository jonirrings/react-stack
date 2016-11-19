/**
 * Created by JonirRings on 2016/11/17.
 */
import mongoose, { Schema } from 'mongoose';

const GitHubSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  loginName: String,
  loginId: {
    type: Number,
    required: true,
    unique: true,
  },
  avatarUrl: String,
  nickName: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});
const GithubModel = mongoose.model('GitHub', GitHubSchema);
export default GithubModel;

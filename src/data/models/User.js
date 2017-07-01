// @flow

import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  githubId: String,
  timezone: Number,
  admin: Boolean,
});

const User = mongoose.model('User', UserSchema);

export async function createUser(
  { name, githubId, timezone }: {name: string, githubId: string, timezone: number},
    ) {
  const adminCount = await User.count({ admin: true });
  const admin = adminCount === 0;
  const user = new User({ name, githubId, timezone, admin });
  return user.save();
}

export async function readUser({ id }: {id: string}) {
  return User.findById(id);
}

export async function readUsers() {
  return User.find();
}

export async function getAdmin() {
  return User.findOne({ admin: true });
}

export default {
  readUser,
  createUser,
  readUsers,
};

// @flow
import mongoose, { Schema } from 'mongoose';
import { virtualMeta } from './apiHelper';

const PostSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

PostSchema.virtual('meta').get(virtualMeta);

const Post = mongoose.model('Post', PostSchema);

export function createPost(
  { title, content, author }: {title: string, content: string, author: string},
) {
  const post = new Post({ title, content, author });
  return post.save();
}

export function deletePost({ id }: {id: string}) {
  return Post.findByIdAndRemove(id);
}

export function updatePost(
  { id, title, content }: {id: string, title: string, content: string},
) {
  return Post.update({ _id: id }, { title, content, updated: new Date() });
}

export function readPost({ id }: {id: string}) {
  return Post.findById(id);
}

export function readPosts() {
  return Post.find();
}

export default {
  createPost,
  deletePost,
  updatePost,
  readPost,
  readPosts,
};

/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export Captcha from './Captcha';
export Chat from './Chat';
export Cookie from './Cookie';
export Post from './Post';
export Comment from './Comment';
export Stat from './Stat';
export User from './User';

export function getCaptchaById() {
}
export function getChatById() {
}
export function getCookieById() {
}
export function getPostById() {
}
export function getCommentById() {
}
export function getStatById() {
}
export async function getUserById(id) {
  const user = await User.findOne({ _id: id }).exec().then(e => e.toObject());
  return user;
}
export function getCommentsByPostId() {
}
export async function getPostsByAuthorId(id) {
  return await Post.findOne({ id }).exec().then(e => e.toObject());
}
export function getCommentsByAuthorId() {
}
export function getPosts() {
}
export function getUsers() {
}

export function addUser({ name, avatar }) {
  return { name, avatar };
}
export function updateUser({ id, name, avatar }) {
  return { id, name, avatar };
}
export function addPost({ author, title, content }) {
  return { author, title, content };
}
export function updatePost({ id, title, content }) {
  return { id, title, content };
}
export function removePost({ id }) {
  return { id };
}
export function addComment({ author, content, commentOnId, replyToId }) {
  return { author, content, commentOnId, replyToId };
}
export function removeComment({ id }) {
  return { id };
}
export function updateComment({ commentId, content }) {
  return { commentId, content };
}
export function addCaptcha({ userId }) {
  return { userId };
}
export function removeCaptcha({ id, value }) {
  return { id, value };
}
export function updateCaptcha({ id }) {
  return { id };
}

/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Captcha from './Captcha';
import Chat from './Chat';
import Cookie from './Cookie';
import Post from './Post';
import Comment from './Comment';
import Stat from './Stat';
import User from './User';

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
export function getUserById() {
}
export function getCommentsByPostId() {
}
export function getPostsByAuthorId() {
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
export function removePost({id}) {
  return {id};
}
export function addComment({author,content,commentOnId,replyToId}) {
  return {author,content,commentOnId,replyToId};
}
export function removeComment({id}) {
  return {id};
}
export function updateComment({commentId,content}) {
  return {commentId, content};
}
export function addCaptcha({userId}) {
  return{userId}
}
export function removeCaptcha({id, value}) {
  return{id,value}
}
export function updateCaptcha({id}) {
  return {id};
}

export {
  Captcha,
  Chat,
  Cookie,
  Post,
  Comment,
  Stat,
  User,
};

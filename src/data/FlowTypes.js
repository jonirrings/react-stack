// @flow

export type Edge = {
  node: any,
  cursor: string,
}

export type PageInfo = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string,
  endCursor: string,
}

export type Author = {
  id: string,
  name: string,
}

export type Meta = {
  created: Date,
  updated: Date,
}

export type Post = {
  author: Author,
  title: string,
  content: string,
  meta: Meta,
}

export type Blogger = {
  resume: string,
  qq: string,
  github: string,
  weibo: string,
  email: string,
}

export type Rel = {
  title: string,
  url: string,
}

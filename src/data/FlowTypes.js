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
  title: string,
  url: string,
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

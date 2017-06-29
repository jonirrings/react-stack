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

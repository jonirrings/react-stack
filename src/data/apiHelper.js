// @flow

export async function getObjectFromTypeAndId(
  type: string,
  id: string,
) {
  return new Promise((resolve) => {
    resolve(type, id); // fixme to add the data fetch logic
  });
}

export async function setObjectById(
  object: any,
  id: string,
) {
  return new Promise((resolve) => {
    resolve(object, id); // fixme to add the data mutation logic
  });
}

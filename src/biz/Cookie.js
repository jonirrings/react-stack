/**
 * Created by JonirRings on 2016/11/19.
 */
import { Cookie } from '../data/models';

export function signIn(user, cookie) {
  const newCookie = new Cookie({ ...cookie, user: user.id });
  return newCookie.save();
}
export function signOut(cookie) {
  return cookie;
}

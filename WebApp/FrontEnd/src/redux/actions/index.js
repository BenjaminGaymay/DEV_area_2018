import { LOG_USER_IN } from '../constants/action-types';

export function logUserIn(payload) {
  return { type: LOG_USER_IN, payload };
}

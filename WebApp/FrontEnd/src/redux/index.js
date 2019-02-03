import store from './store';
import { logUserIn } from './actions';

window.store = store;
window.logUserIn = logUserIn;
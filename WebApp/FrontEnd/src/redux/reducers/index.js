import { LOG_USER_IN } from "../constants/action-types";

const initialState = {
  isLogged: false,
  username: "",
  password: ""
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        ...state,
        isLogged: action.payload.isLogged,
        username: action.payload.username,
        password: action.payload.password
      };
    default:
      return state;
  }
}

export default rootReducer;

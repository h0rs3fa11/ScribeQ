const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CUR_USER":
      return {
        id: action.payload.id,
        username: action.payload.username,
        loggedIn: true,
      };

    case "CLEAR_USER":
      return {
        loggedIn: false,
      };

    default:
      return state;
  }
};

export const setCurrentUser = (user) => async (dispatch) => {
  dispatch({ type: "SET_CUR_USER", payload: user });
};

export const clearLoggedUser = () => async (dispatch) => {
  dispatch({ type: "CLEAR_USER" });
};

export default userReducer;

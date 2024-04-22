const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_INFO":
      return {
        type: "success",
        info: action.payload,
      };

    case "SET_ERROR":
      return {
        type: "danger",
        info: action.payload,
      };

    default:
      return state;
  }
};

export const setInfo = (info) => (dispatch) => {
  dispatch({ type: "SET_INFO", payload: info });
};

export const setError = (error) => (dispatch) => {
  dispatch({ type: "SET_ERROR", payload: error });
};

export default notificationReducer;

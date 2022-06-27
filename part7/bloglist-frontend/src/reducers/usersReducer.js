const usersReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USERS":
      return action.data;
    default:
      return state;
  }
};

export const setUsers = (users) => {
  return {
    type: "SET_USERS",
    data: users,
  };
};

export default usersReducer;

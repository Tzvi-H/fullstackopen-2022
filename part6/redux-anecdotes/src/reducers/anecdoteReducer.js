import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ANECTDOTES":
      return action.data;
    case "CREATE":
      return [...state, action.data];
    case "VOTE":
      const anecdote = state.find((a) => a.id === action.data);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((a) => (a.id !== action.data ? a : changedAnecdote));
    default:
      return state;
  }
};

const addAnecdote = (anecdote) => {
  return {
    type: "CREATE",
    data: anecdote,
  };
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    data: id,
  };
};

const setAnecdotes = (anecdotes) => {
  return {
    type: "SET_ANECTDOTES",
    data: anecdotes,
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content);
    dispatch(addAnecdote(anecdote));
  };
};

export default reducer;

import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ANECTDOTES":
      return action.data;
    case "CREATE":
      return [...state, action.data];
    case "UPDATE":
      const updatedAnecdote = action.data;
      return state.map((a) =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      );
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

const updateAnecdote = (anecdote) => {
  return {
    type: "UPDATE",
    data: anecdote,
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

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default reducer;

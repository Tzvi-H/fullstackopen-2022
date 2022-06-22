import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

const sortByVotes = (anecdotes) => {
  return anecdotes.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1;
    } else if (b.votes > a.votes) {
      return 1;
    } else {
      return 0;
    }
  });
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => sortByVotes(state.anecdotes));
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

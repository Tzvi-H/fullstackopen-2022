import { useSelector, useDispatch } from "react-redux";
import { voteFor, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const anecdotesToShow = anecdotes.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1;
    } else if (b.votes > a.votes) {
      return 1;
    } else {
      return 0;
    }
  });

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.content.value));
    e.target.content.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;

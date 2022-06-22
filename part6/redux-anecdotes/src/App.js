import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

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

      <AnecdoteForm />
    </div>
  );
};

export default App;

import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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

const filterWordsByWord = (words, word) => {
  return words.filter(({ content }) =>
    content.toLowerCase().includes(word.toLowerCase())
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return sortByVotes(filterWordsByWord(state.anecdotes, state.filter));
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote));
    dispatch(setNotification("successly voted", 3));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

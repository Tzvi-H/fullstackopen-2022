import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const savedAnecdote = await anecdoteService.create(content);
    e.target.content.value = "";
    dispatch(addAnecdote(savedAnecdote));
    dispatch(setNotification(`created anecdote "${content}"`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 3000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

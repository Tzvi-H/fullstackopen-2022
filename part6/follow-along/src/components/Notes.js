import { useSelector, useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => (
  <li onClick={handleClick}>
    {note.content} <strong>{note.important ? "important" : ""}</strong>
  </li>
);
const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.content}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;

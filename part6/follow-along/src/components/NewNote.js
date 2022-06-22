import { connect } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = (props) => {
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    props.createNote(content);
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

const connectedNewNote = connect(null, { createNote })(NewNote);

export default connectedNewNote;

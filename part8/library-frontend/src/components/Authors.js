import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const Authors = (props) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  if (!props.show) {
    return null;
  }

  const submit = (e) => {
    e.preventDefault();
    editAuthor({
      variables: {
        name: e.target.name.value,
        setBornTo: Number(e.target.born.value),
      },
    });
    e.target.name.value = "";
    e.target.born.value = "";
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            name
            <input name="name" />
          </div>
          <div>
            born
            <input name="born" type="number" />
          </div>
          <input type="submit" value="update author" />
        </form>
      </div>
    </div>
  );
};

export default Authors;

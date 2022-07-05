import { useState } from "react";
import BooksTable from "./BooksTable";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS_OF_GENRE } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const booksByGenreResult = useQuery(ALL_BOOKS_OF_GENRE, {
    skip: !genre,
    variables: { genre },
  });

  if (!props.show) {
    return null;
  }

  const booksToShow = genre
    ? booksByGenreResult.data && booksByGenreResult.data.allBooks
    : props.books;

  let genres = [...new Set(props.books.map((b) => b.genres).flat())];

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <div>
          in genre <strong>{genre}</strong>
          <br />
        </div>
      )}

      <BooksTable books={booksToShow} />

      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;

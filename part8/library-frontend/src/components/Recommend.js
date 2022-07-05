import BooksTable from "./BooksTable";

const Recommend = (props) => {
  if (!props.show) {
    return null;
  }

  const booksToShow = props.books.filter((b) =>
    b.genres.includes(props.meData.me.favouriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{" "}
        <strong>{props.meData.me.favouriteGenre}</strong>
      </p>
      <BooksTable books={booksToShow} />
    </div>
  );
};

export default Recommend;

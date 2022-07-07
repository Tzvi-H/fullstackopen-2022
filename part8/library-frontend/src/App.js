import { useState, useEffect } from "react";
import { useQuery, useSubscription, useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";

import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME, { skip: !token });

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      alert(`Successfully added ${addedBook.title}`);
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  if (authorsResult.loading || booksResult.loading) {
    return <div>Loading...</div>;
  }

  const handleLogin = (token) => {
    setToken(token);
    setPage("authors");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Login show={page === "login"} handleLogin={handleLogin} />

      <Authors
        userLoggedIn={token !== null}
        show={page === "authors"}
        authors={authorsResult.data.allAuthors}
      />

      <Books show={page === "books"} books={booksResult.data.allBooks} />
      <Recommend
        show={page === "recommend"}
        meData={meResult.data}
        books={booksResult.data.allBooks}
      />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;

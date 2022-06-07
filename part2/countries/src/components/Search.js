const Search = ({ query, setQuery }) => (
  <div>
    find countries
    <input input={query} onChange={({ target }) => setQuery(target.value)} />
  </div>
);

export default Search;

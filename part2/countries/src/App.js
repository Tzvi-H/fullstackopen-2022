import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(({ data }) => {
      console.log(data[0]);
      setCountries(data);
    });
  }, []);

  const countriesToDisplay = countries.filter((c) =>
    c.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Search query={query} setQuery={setQuery} />
      <Countries countriesToDisplay={countriesToDisplay} />
    </div>
  );
};

export default App;

import CountryDetails from "./CountryDetails";

const Countries = ({ countriesToDisplay, setQuery }) => {
  if (countriesToDisplay.length === 0) {
    return "no matches";
  } else if (countriesToDisplay.length > 10) {
    return "Too many matches, specify another filter";
  } else if (countriesToDisplay.length === 1) {
    return <CountryDetails country={countriesToDisplay[0]} />;
  } else {
    return countriesToDisplay.map((country) => (
      <p key={country.name.common}>
        {country.name.common}{" "}
        <button onClick={() => setQuery(country.name.common)}>show</button>
      </p>
    ));
  }
};

export default Countries;

import Person from "./Person";

const Persons = ({ personsToShow }) => (
  <>
    {personsToShow.map((person) => (
      <Person person={person} key={person.name} />
    ))}
  </>
);

export default Persons;

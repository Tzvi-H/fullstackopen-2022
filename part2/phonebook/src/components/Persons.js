import Person from "./Person";

const Persons = ({ personsToShow, deletePerson }) => (
  <>
    {personsToShow.map((person) => (
      <Person person={person} deletePerson={deletePerson} key={person.name} />
    ))}
  </>
);

export default Persons;

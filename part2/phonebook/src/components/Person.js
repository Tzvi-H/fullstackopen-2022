const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person)}>delete</button>
  </div>
);

export default Person;

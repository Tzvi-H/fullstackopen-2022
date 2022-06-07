import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    persons.find((p) => p.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
        />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="tel"
            value={newNumber}
            onChange={({ target }) => setNewNumber(target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map(({ name, number }) => (
        <div key={name}>
          {name} {number}
        </div>
      ))}
    </div>
  );
};

export default App;

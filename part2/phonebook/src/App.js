import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personServices.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personServices
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((newPerson) => {
            setPersons(
              persons.map((p) => (p.id !== newPerson.id ? p : newPerson))
            );
            setMessage({
              text: `Changed number for ${newName}`,
              type: "success",
            });
            setTimeout(() => setMessage(null), 3000);
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personServices
        .create({ name: newName, number: newNumber })
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setMessage({
            text: `Added ${newName}`,
            type: "success",
          });
          setTimeout(() => setMessage(null), 3000);
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personServices
        .destroy(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setMessage({ text: `Deleted ${person.name}`, type: "success" });
          setTimeout(() => setMessage(null), 3000);
        })
        .catch((e) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setMessage({
            text: `${person.name} is already removed from the server`,
            type: "error",
          });
          setTimeout(() => setMessage(null), 3000);
        });
    }
  };

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        {...{ newName, setNewName, newNumber, setNewNumber, addPerson }}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

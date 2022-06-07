const PersonForm = ({
  addPerson,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => (
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
);

export default PersonForm;

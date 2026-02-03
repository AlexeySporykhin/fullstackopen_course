import { useState } from "react";

const Filter = ({ filterSubstring, handleFilterInput }) => {
  return (
    <div>
      filter shown with:
      <input value={filterSubstring} onChange={handleFilterInput} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newPhone,
  handleSubmit,
  handleInputName,
  handleInputPhone,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          name: <input value={newName} onChange={handleInputName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handleInputPhone} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

const Person = ({ person }) => (
  <li>
    {person.name} {person.number}
  </li>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterSubstring, setFilterSubstring] = useState("");

  const handleFilterInput = (event) => {
    setFilterSubstring(event.target.value);
  };

  const filteredPersons = (substring = filterSubstring) => {
    return substring === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(substring.toLowerCase()),
        );
  };
  const handleInputName = (event) => {
    setNewName(event.target.value);
  };

  const handleInputPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newPhone,
    };
    const exists = persons.some((p) => p.name === person.name);
    if (exists) {
      alert(`${newName} is already in the phonebook`);
      return;
    }
    const upd_persons = persons.concat(person);
    setPersons(upd_persons);
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterSubstring={filterSubstring}
        handleFilterInput={handleFilterInput}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleSubmit={handleSubmit}
        handleInputName={handleInputName}
        handleInputPhone={handleInputPhone}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} />
    </div>
  );
};

export default App;

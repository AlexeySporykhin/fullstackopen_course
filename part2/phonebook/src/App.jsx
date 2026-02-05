import { useState, useEffect } from "react";
import personsService from './services/persons'

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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterSubstring, setFilterSubstring] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons)=> setPersons(initialPersons));
  }, []);

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

    personsService.createPerson(person).then((returnedPerson) => {
      const upd_persons = persons.concat(returnedPerson);
      setPersons(upd_persons);
      setNewName("");
      setNewPhone("");
    });
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

import { useState, useEffect } from "react";
import personsService from "./services/persons";

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

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

const Person = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button type="button" onClick={() => onDelete(person)}>
        delete
      </button>
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterSubstring, setFilterSubstring] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
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

    const ExistedPerson = persons.find((p) => p.name.trim() === person.name.trim());
    if (ExistedPerson) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const changedPerson = { ...ExistedPerson, number: person.number };
        personsService.updatePerson(changedPerson).then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person,
            ),
          );
        });
      }
      return;
    }

    personsService.createPerson(person).then((returnedPerson) => {
      const upd_persons = persons.concat(returnedPerson);
      setPersons(upd_persons);
      setNewName("");
      setNewPhone("");
    });
  };

  const handleDelete = (person) => {
    const id = person.id;
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .deletePerson(id)
        .then((deletedPerson) =>
          setPersons(persons.filter((p) => p.id !== deletedPerson.id)),
        );
    }
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
      <Persons persons={filteredPersons()} onDelete={handleDelete} />
    </div>
  );
};

export default App;

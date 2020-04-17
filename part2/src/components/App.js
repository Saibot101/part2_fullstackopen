import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from '../services/notes'

const App = () => {
    const [ persons, setPersons] = useState([
    ]);
    const [ newName, setNewName ] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [showPersons, setPersonsShow] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        personService.getAll()
            .then(initinalPersons => {
                setPersons(initinalPersons)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault();

        const nameObject = {
            name: newName,
            number: newNumber
        }
        if(persons.find(person => person.name === newName)){
            const replacePerson = persons.find(person => person.name === newName);
            const result = window.confirm(`${newName} is already in the phonebook, replace the old number with a new one ?`);
            if(result){
                const newObject = {
                    ...replacePerson,
                    number: newNumber
                }
                personService.update(replacePerson.id, newObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
                    })
            }

        } else {
            personService.create(nameObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }


    };

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    };

    const changeHandler = (event) => {
        setSearch(event.target.value)

        if(event.target.value !== ""){
            setPersonsShow(false);
            console.log(false)
        } else {
            setPersonsShow(true)
            console.log(true)
        }
    }

    const deletePerson = (id) => {

        const person = persons.find(person => person.id === id)

        const result = window.confirm(`Delete ${person.name}`)
        if(result){
            personService.setDelete(id)

            setPersons(persons.filter(person => person.id !== id))
        }
    }

    const personsToShow = showPersons ? persons : persons.filter( person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1 );

    return (
        <div>
            <h2>Phonebook</h2>
            <p>filter shown with </p>
            <input value={search} onChange={changeHandler}/>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                <ul>
                    {personsToShow.map( person =>
                        [<p key={person.key}>{person.name}  {person.number}</p>,
                            <button onClick={() => deletePerson(person.id)}>delete {person.name}</button> ]

                    )
                    }

                </ul>
            </div>

        </div>
    )
};

export default App

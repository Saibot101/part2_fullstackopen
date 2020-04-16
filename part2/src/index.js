import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567',id: 1 },
        { name: 'Abscdfkjf', number: '64616161',id: 2 }
    ]);
    const [ newName, setNewName ] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [showPersons, setPersonsShow] = useState(true);
    const [search, setSearch] = useState('');


    const addName = (event) => {
        event.preventDefault();


        for( let i = 0; i<persons.length;i++){
            if (persons[i].name === newName || persons[i].number === newNumber){
                window.alert(`${newName} or ${newNumber} is already in the phonebook`);
            }
            else{
                const nameObject = {
                    name: newName,
                    number: newNumber,
                    id: persons.length+1
                };

                setPersons(persons.concat(nameObject));
                setNewName('')
                setNewNumber('')
            }
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
                        <p key={person.name}>{person.name}  {person.number}</p>,

                    )
                        }

                </ul>
            </div>

        </div>
    )
};


ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('root')
);

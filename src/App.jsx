    import { useState, useEffect } from 'react'
    import axios from 'axios'
    import Filter from './components/Filter';
    import Person from './components/person';
    import PersonForm from './components/PersonForm';
    import PersonService from './services/persons'; 
    import Notifier from './components/Notification';


    const App = () => {
      const [persons, setPersons] = useState([]) 
      const [newName, setNewName] = useState('')
      const [newNumber, setNewNumber] = useState('')
      const [newSearch, setNewSearch] = useState('')
      const [newNotification, setNotification] =useState(null)
      const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch))

      const handleNewName = (event) =>
      {
        setNewName(event.target.value)
        console.log(newName);
        
      } 

      const handleNewNumber = (event) =>
      {
        setNewNumber(event.target.value)
        console.log(newNumber);
        
      }
      const handleNewSearch = (event) =>
        {
          setNewSearch(event.target.value)
          console.log(newSearch);
          
        }

      useEffect(() => {
        PersonService.getAll().then(response => setPersons(response))
      }, [])

      const addNewName = (event) => {
        event.preventDefault()
        const findPerson  = persons.find(({name}) => name === newName)
        if (findPerson) {
          if (window.confirm(`${newName} is already in the phonebook, replace old number with the new one?`)){
            const personObject = {
              ...findPerson,
              number: newNumber
            }         
            PersonService.update(findPerson.id, personObject)
            const newPersons = persons.filter(person => person.id !==findPerson.id)
            setPersons(newPersons.concat(personObject))
            setNotification(`${newName} has been updated`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000) 
          }
        }
        else {
          const personObject = {
            id : String(persons.length + 1), 
            name: newName,
            number: newNumber
          }
          setPersons(persons.concat(personObject))
          setNotification(`${newName} has been added`)    
          setNewName('')

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000) 

          PersonService.create(personObject)
        }

      }

      const removeName = (person) => {
        if (window.confirm(`Do you really want to delete ${person.name}`)){
          PersonService.remove(person.id).catch(error => {
            setNotification(`${person.name} has already been removed from the server.`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)

          })

          setPersons(persons.filter(p => p.id !==person.id))
        }
      }

      return (
        <div>
          <h2>Phonebook</h2>
          <Notifier message = {newNotification}/>
          <h3>Search for a new number</h3>
          <Filter value ={newSearch} onChange= {handleNewSearch}/>
          <h3>Add A New Number</h3>
          <PersonForm addNewName ={addNewName} newName = {newName} handleNewName ={handleNewName} handleNewNumber ={handleNewNumber} />
          <h2>Numbers</h2>
          <ul>
          {peopleToShow.map(person => <Person key = {person.id} name ={person.name} number={person.number} removeName = {() => removeName(person)}/>)}
          </ul>
        </div>
      ) 
    }

    export default App
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Course from "./components/Course";
import Note from "./components/Note"

const App = () => {
    const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true)

    const addNote = (event) => {
      event.preventDefault()
      const NoteObject = {
          content: newNote,
          date: new Date().toISOString(),
          important: Math.random() < 0.5,
          id: notes.length + 1,
      }

      setNotes(notes.concat(NoteObject))
      setNewNote('')
  }

  const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
      <div>
        <Course course={courses} />
        <h1>Notes</h1>
          <div>
              <button onClick={() => setShowAll(!showAll)}> show {showAll ? 'important' : 'all'}</button>
          </div>
        <ul>
            {notesToShow.map(note =>
                <Note key={note.id} note={note}/>
            )}
        </ul>
          <form onSubmit={addNote}>
              <input value={newNote} onChange={handleNoteChange}/>
              <button type="submit">save</button>
          </form>

      </div>
  )
};


ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('root')
);

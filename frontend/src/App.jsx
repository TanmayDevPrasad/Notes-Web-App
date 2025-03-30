import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')

  const addNote = () => {
    if (currentNote.trim() !== '') {
      setNotes([...notes, {
        id: Date.now(),
        content: currentNote,
        createdAt: new Date().toLocaleString()
      }])
      setCurrentNote('')
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <main>
          <div className="note-input">
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Write your note here..."
              rows="4"
            />
            <button onClick={addNote}>Add Note</button>
          </div>

          <div className="notes-grid">
            {notes.map(note => (
              <div key={note.id} className="note-card">
                <p>{note.content}</p>
                <div className="note-footer">
                  <span>{note.createdAt}</span>
                  <button onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { api } from './services/api'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch notes on component mount
  useEffect(() => {
    console.log('Component mounted, fetching notes...')
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      console.log('Fetching notes from API...')
      const data = await api.getNotes()
      console.log('Received notes:', data)
      setNotes(data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching notes:', err)
      setError('Failed to fetch notes')
      setLoading(false)
    }
  }

  const addNote = async () => {
    if (currentNote.trim() !== '') {
      try {
        console.log('Creating new note:', currentNote)
        const newNote = await api.createNote(currentNote)
        console.log('Note created successfully:', newNote)
        setNotes([...notes, newNote])
        setCurrentNote('')
      } catch (err) {
        console.error('Error creating note:', err)
        setError('Failed to create note')
      }
    }
  }

  const deleteNote = async (id) => {
    try {
      console.log('Deleting note with ID:', id)
      await api.deleteNote(id)
      console.log('Note deleted successfully')
      setNotes(notes.filter(note => note.id !== id))
    } catch (err) {
      console.error('Error deleting note:', err)
      setError('Failed to delete note')
    }
  }

  if (loading) {
    return (
      <div className="app">
        <Navbar />
        <div className="app-container">
          <div className="loading">
            <h2>Loading notes...</h2>
            <p>Please wait while we fetch your notes from the server.</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <Navbar />
        <div className="app-container">
          <div className="error">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={fetchNotes}>Try Again</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <main>
          <div className="note-input">
            <h2>Create New Note</h2>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Write your note here..."
              rows="4"
            />
            <button onClick={addNote}>Add Note</button>
          </div>

          <div className="notes-section">
            <h2>Your Notes ({notes.length})</h2>
            <div className="notes-grid">
              {notes.length === 0 ? (
                <div className="no-notes">
                  <p>No notes yet. Create your first note above!</p>
                </div>
              ) : (
                notes.map(note => (
                  <div key={note.id} className="note-card">
                    <p>{note.content}</p>
                    <div className="note-footer">
                      <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
                      <button onClick={() => deleteNote(note.id)}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

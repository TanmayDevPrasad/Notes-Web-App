const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage for notes (replace with database in production)
let notes = []

// API Routes
// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// Create a new note
app.post('/api/notes', (req, res) => {
  const { content } = req.body
  const newNote = {
    id: Date.now(),
    content,
    createdAt: new Date().toISOString()
  }
  notes.push(newNote)
  res.status(201).json(newNote)
})

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== parseInt(id))
  res.status(204).send()
})

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const { content } = req.body
  const noteIndex = notes.findIndex(note => note.id === parseInt(id))
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' })
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    content,
    updatedAt: new Date().toISOString()
  }
  
  res.json(notes[noteIndex])
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
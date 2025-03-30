const API_URL = 'http://localhost:3000/api'

export const api = {
  // Get all notes
  getNotes: async () => {
    const response = await fetch(`${API_URL}/notes`)
    if (!response.ok) {
      throw new Error('Failed to fetch notes')
    }
    return response.json()
  },

  // Create a new note
  createNote: async (content) => {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
    if (!response.ok) {
      throw new Error('Failed to create note')
    }
    return response.json()
  },

  // Delete a note
  deleteNote: async (id) => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete note')
    }
    return true
  },

  // Update a note
  updateNote: async (id, content) => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
    if (!response.ok) {
      throw new Error('Failed to update note')
    }
    return response.json()
  },
} 
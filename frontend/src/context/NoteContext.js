import { useState, useEffect, createContext } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { toast } from 'react-toastify'

const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState([])

  const fetchNotes = () => {
    createAPIEndpoint(ENDPOINTS.NOTES)
      .fetch()
      .then((res) => {
        // console.log(res.data)
        // toast.success(`total : ${notes.length}`)
        setNotes(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(`Something went wrong upon fetching notes: ${err}`)
      })
  }

  const addNote = (newNote) => {
    createAPIEndpoint(ENDPOINTS.NOTES)
      .create(newNote)
      .then((res) => {
        setIsLoading(true)
        console.log(res.data)
        setNotes(res.data)
        setIsLoading(false)
        toast.success(' A new note has been created')
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(`Something went wrong upon creating note: ${err}`)
      })
  }

  const updateNote = (id, updNote) => {
    createAPIEndpoint(ENDPOINTS.NOTES)
      .update(id, updNote)
      .then((res) => {
        setIsLoading(true)
        const newNotes = notes.map((note) => {
          // console.log(note.id === id)
          return note.id === id ? { ...note, ...updNote } : note
        })
        // console.log(newNotes)
        setNotes(newNotes)
        setIsLoading(false)
        toast.success(`Note ${id} has been updated`)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(`Something went wrong upon updating note: ${err}`)
      })
  }

  const deleteNote = (id) => {
    setIsLoading(true)
    createAPIEndpoint(ENDPOINTS.NOTES)
      .delete(id)
      .then((res) => {
        const newNotes = notes.filter((note) => note.id !== id)
        setNotes(newNotes)
        setIsLoading(false)
        toast.success(`Note ${id} has been deleted`)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(`Something went wrong upon deleting note: ${err}`)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <NoteContext.Provider
      value={{
        isLoading,
        notes,
        deleteNote,
        addNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export default NoteContext

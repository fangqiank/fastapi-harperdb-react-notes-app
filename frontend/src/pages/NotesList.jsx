import React, {useContext, useState} from 'react'
import NoteContext from '../context/NoteContext'
import { confirm } from "react-confirm-box"
import Modal from 'react-modal'
import { NoteItem } from '../components/NoteItem'
import {Spinner} from '../components/Spinner'

const customStyles = {
  content: {
		width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
		position: 'relative',
  },
}

Modal.setAppElement('#root')

let noteId = 0

export const NotesList = () => {

	const {notes, isLoading, deleteNote, addNote, updateNote} = useContext(NoteContext)

	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [modalIsOpen, setModalIsOpen] = useState(false)

	isLoading && <Spinner />

	const initiallizeForm = () => {
		noteId = 0
		setTitle('')
		setBody('')
	}

	const openModal = () => setModalIsOpen(true)
  const closeModal = () => {
		initiallizeForm()
		setModalIsOpen(false)
	}

	const handleDelete = async (options, note) => {
    const result = await confirm(`Are you sure to delete note: ${note.title}?`, options);
    if (result) {
			deleteNote(note.id)
      return
    }
  }

	const handleEdit = note => {
		noteId = note.id
		setTitle(note.title)
		setBody(note.body)
		openModal()
	}

	const handleSubmit = e =>{
		if(noteId === 0){
			e.preventDefault()

			addNote({title, body})
			closeModal()
		}else{
			updateNote(noteId, {title, body})
			closeModal()
		}

	}


	return (
		<>
			<div className='notes'>
				<div className="notes-header">
					<h2 className="notes-title">&#9782; Notes</h2>
					<p className="notes-count">{notes.length}</p>
				</div>
					
				<div className="notes-list">
					{notes.map(note => (
							<div className='notes-list-item' key={note.id}>
								<NoteItem 
									note={note} 
									handleDelete={handleDelete}
									handleEdit={handleEdit}
								/>
							</div>
					))}
				</div>
			</div>
			
			<button className='floating-button' onClick={openModal}>
				<span style ={{fontSize:'30px'}}>
				<i className="fa-solid fa-plus"></i>
				</span>
			</button>

			<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel='Add note'
		>
			<h2>Add Note</h2>
			<button className='btn-close' onClick={closeModal}>X</button>

			<form onSubmit={handleSubmit}>
			<div className='form-group'>
					<input 
						type='text'
						name="title" 
						id="title"
						className='form-control'
						placeholder='Enter the title here'
						value={title}
						onChange = {e => setTitle(e.target.value)}
					/>
				</div>

				<div className='form-group'>
					<textarea 
						name="body" 
						id="body"
						className='form-control'
						placeholder='Enter your content here'
						value={body}
						onChange = {e => setBody(e.target.value)}
					></textarea>
				</div>

				<div className='form-group'>
					<button className='btn' type='submit' >
						Submit
					</button>
				</div>
			</form>
	</Modal>
	</>
	)
}

import React from 'react'
import {Link} from 'react-router-dom'

const optionsWithClonOnOverlayclick = {
  closeOnOverlayClick: true
}

export const NoteItem = ({note, handleDelete, handleEdit}) => {

	return (
		<>
			<Link to={`notes/${note.id}`}>
				<h3>{note.title}</h3>
			</Link>	

			<p>
				<span>{new Date(note.updatedAt).toLocaleDateString('en-US')}</span>
				{/* {note.body} */}
				<span style={{'marginLeft': '20px'}}>
					<i 
						className="fa-solid fa-trash-can" 
						style={{'color': '#C70039'}}
						onClick={() => handleDelete(optionsWithClonOnOverlayclick, note)}
					></i>
				</span>
				<span style={{'marginLeft': '5px'}}>
					<i 
						className="fa-solid fa-pen"
						style={{'color': '#0082C7'}}
						onClick={() => handleEdit(note)}
					>
					</i>
				</span>
			</p>
		</>
	)
}

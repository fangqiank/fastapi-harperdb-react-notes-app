import React,{useState, useEffect} from 'react'
// import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useParams } from 'react-router-dom'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import {BackButton} from '../components/BackButton'
import {toast} from 'react-toastify'

export const NoteDetail = () => {
  const {id} = useParams()
	// const navigate = useNavigate() 

	const [note, setNote] = useState(null)

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.NOTES)
		.fetchById(id)
		.then(res => {
			// toast.success(`Note ${id} page is coming`)
			setNote(res.data)
		})
		.catch(err => {
			toast.error(`Error fetching note ${id}`)
		})
	},[id])

	return (
		<div className='note-page'>
			<BackButton url={'/'}/>
			{
				note && (
					<>
						<h2>
							Note ID: {note.id}
							<span className={`status status-${note.status}`}>
								{note.status}
							</span>
						</h2>

						<h2>
							Date submitted: {new Date(note.updatedAt).toLocaleDateString('en-US')}
						</h2>
						<hr 
						  style={{
								height:'1px',
								border:'none',
								color:'#333',
								backgroundColor:'#333' 
							}}
						/>
						<div className='note-desc'>
							{/* <h3>Content of Note</h3> */}
							<p>{note.body}</p>
						</div>
					</>
				)
			}
	</div>
	)
}

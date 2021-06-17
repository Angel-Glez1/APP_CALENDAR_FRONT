import React from 'react'
import { useDispatch } from 'react-redux'
import { startEventDelete } from '../../actions/events';


export const DeleteEventFab = () => {

	const dispatch = useDispatch();
	

	const handleDeleteEvent = () => {
		dispatch(startEventDelete());
	}


	return (
		<button
			onClick={handleDeleteEvent}
			className="btn btn-danger fab-danger"
		>
			<i className="fas fa-trash" ></i>

		</button>
	)
}

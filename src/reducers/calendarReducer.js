import { types } from '../types/types';

const initialState = {
	events: [],
	activeEvent: null
}

export const calendarReducer  = ( state = initialState, action ) => {

	switch (action.type) {

		// Limpia el state al hacer logout
		case types.eventClear:
			return{ 
				...initialState
			}


		// Setear Evento
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload
			}

		// Add new Event
		case types.eventAddNew:
			return {
				...state,
				events : [...state.events, action.payload]
			}
			
		// Clearing event active
		case types.eventClearActiveEvent:
			return {
				...state,
				activeEvent : null
			}

		// Update event 
		case types.eventUpdateEvent:
			return {
				...state,
				events : state.events.map( e => (e.id === action.payload.id) ? action.payload : e )
			}

		// Elimina un evento del sate
		case types.eventDeleted:				
			return {
				...state,
				events: state.events.filter(e => e.id !== state.activeEvent.id  ),
				activeEvent: null
			}

		// Carga los eventos de la base de datos.
		case types.eventLoaded:
			return {
				...state,
				events: [ ...action.payload ]
			}			

		default:
			return state;
	}


}

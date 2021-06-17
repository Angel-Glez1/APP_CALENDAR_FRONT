/**
 * Acciones a mi calendarReducer
 */

import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';


export const eventSetActive = (event) => ({
	type: types.eventSetActive,
	payload: event
})

export const eventClearActiveEvent = () => ({
	type: types.eventClearActiveEvent
});


export const eventClearStateLogout = () => ({
	type : types.eventClear
})




const eventAddNew = (event) => ({
	type: types.eventAddNew,
	payload: event
})

const eventUpdated = ( activeEvent ) => ({
	type : types.eventUpdateEvent,
	payload: activeEvent
})

const eventDeleted = () => ({
	type: types.eventDeleted
});


const eventsLoaded = (event) => ({
	type : types.eventLoaded,
	payload : event
})


/*------------------------------------------------
|		Acciones Asincronas contra la database
---------------------------------------------------*/ 

/**
 * Esta accion se encarga de hacer la peticion a la api
 * para guadar un nuevo evento y si no hubo un error al gudarlo
 * actualiza el store agregado al state del calendarReducer,
 * el nuevo evento creado.
 * 
 * @param {Object} event El evento a guardar en la DDBB
 * @returns {[void]} Actuliza el store 
 */
export const startEventAddNew = (event) => {
	return async (dispatch, getState) => {
		
		const { uid, name } = getState().auth;

		try{

			const resp = await fetchConToken('events', event, 'POST');
			const body = await resp.json();
			
			if(body.ok){
				event.id = body.evento.id;
				event.user = {  
					_id : uid,
					name: name
				}

				dispatch(eventAddNew( event ) );
			}


		}catch(e){
			console.log(e);
		}

	}
}

/**
 * Se encarga de traer todos los evento de la base de datos
 * para iterarlos en el componente <calendarScreen/>.
 * 
 * @returns {Array} Retorna un array de objetos
 */ 
export const eventStartLoading = () => {
	return async ( dispatch ) => {

		try {
			const resp = await fetchConToken('events');
			const body = await resp.json();

			const events = prepareEvents( body.eventos );
			
			dispatch( eventsLoaded(events) ) 

		} catch (error) {
			console.log(error);
		}
	}
}

/**
 * Esta accion se encarga de actulizar un evento 
 * 
 * @param {Object} event El evento a actulizar
 * @returns Cambia el state de mi calendarReducer
 */
export const startUpdateEvent = (event) => {
	return async (dispatch) => {
		try{

			const resp = await fetchConToken(`events/${event.id}`, event, 'PUT' );
			const body = await resp.json();
			
			
			if(body.ok){
				dispatch( eventUpdated(event) );
				Swal.fire('Error', 'Evento Actulizado', 'success');

			}else{
				Swal.fire('Error', body.errors.errors[0].msg, 'error');
			}
			
			
		}catch(error){
			console.log(error);
		}
	}
}


/**
 * Esta accion se encarga de elimiar un eventi
 * @param {String} id ID del evento  
 */
export const startEventDelete = () => {

	return async (dispatch, getState) => {

		const { id } = getState().calendar.activeEvent;

		try{	

			const resp = await fetchConToken(`events/${id}`, {} , 'DELETE');
			const body = await resp.json();
			

			if (body.ok) {
				dispatch(eventDeleted());
				Swal.fire('Error', 'Evento Elimino', 'success');

			} else {
				Swal.fire('Error', body.errors.errors[0].msg, 'error');
			}


		}catch(e){
			console.log(e);
		}
	}

}
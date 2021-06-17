/**
 * Este reducer se encarga de 
 * mostar o ocultar la venta Modal(Esta ventana se ocupa para crear un nuevo evento en mi calendario)
 * 
 */
import { types } from '../types/types';
const initialState = { 
	modalOpen: false 
}

export const uiReducer = (state = initialState , action ) => {

	switch (action.type) {

		// Abir la ventada modal
		case types.uiOpenModal:
			return {
				...state,
				modalOpen: true
			}

		// Cerrar la venta modal
		case types.uiCloseModal:
			return {
				...state,
				modalOpen: false
			}
			
		default:
			return state;
			
	}

}


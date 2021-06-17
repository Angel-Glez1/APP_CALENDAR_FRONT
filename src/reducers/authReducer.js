import { types } from "../types/types";



const initialState = {
	checking: true,
	// uid: null,
	// name : null

}


export const authReducer = (state = initialState, action) => {

	switch (action.type) {

		// Setea el state del user en el store
		case types.authLogin:
			return {
				...state,
				...action.payload,
				checking: false
			};
		
		// Saber si la session del user esta activa
		case types.authCheckingFinish : 
			return{
				...state,
				checking: false
			}

		// Cerra la session
		case types.authLogout:
			return {
				checking: false
			}


		default:
			return state;
	}

}
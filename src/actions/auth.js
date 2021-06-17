import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventClearStateLogout } from './events';

/* -------------------------------------------------
|			Acciones Sincronas 
-----------------------------------------------------*/
const login = (user) => ({
	type : types.authLogin,
	payload : user
})
 
const logout = () => ({
	type: types.authLogout
})

const checkingFinish = () => ({
	type: types.authCheckingFinish

});



/* -------------------------------------------------
|			Acciones Asincronas
-----------------------------------------------------*/

// Hace el login a mi backend y setea la info del user en mi state 
export const startLogin = (email, password) => {

	return async (dispatch) => {

		try{

			const resp = await fetchSinToken('auth', { email, password }, 'POST' );
			const { ok, token, uid , name, msg } = await resp.json();
			if(ok){

				localStorage.setItem('token', token)
				localStorage.setItem('token-init-date', new Date().getTime());
				dispatch( login({ uid, name }) );

			}else{

				Swal.fire('Error', msg, 'error');
				

			}

		}catch(e){

			Swal.fire('Error', 'Servidores Fuera de servicio' , 'error');
			console.log(e);
		}
		
	}

}

// Registra un nuevo usuario en el backend y setea la info del user en el stateGobal
export const startRegister = ( name, email, password ) => {
	return async (dispatch) => {
		
		try{

			const resp = await fetchSinToken('auth/new', {name, email, password }, 'POST');
			const body = await resp.json();

			if (body.ok) {
				localStorage.setItem('token', body.token)
				localStorage.setItem('token-init-date', new Date().getTime());

				dispatch(login( { uid: body.uid, name : body.name } ));

			} else {
				Swal.fire('Error', body.msg, 'error');
			}

			

		}catch(e){
			console.log(e);
			
		}
	}
}


// Saber si la session del usuario esta activa
export const startChecking = () => {
	return async ( dispatch ) => {


		try {

			const resp = await fetchConToken('auth/renew');
			const body = await resp.json();

			if (body.ok) {
				localStorage.setItem('token', body.token)
				localStorage.setItem('token-init-date', new Date().getTime());

				dispatch(login({ uid: body.uid, name: body.name }));

			} else {

				dispatch(checkingFinish());

			}



		} catch (e) {
			console.log(e);

		}
	}
}


export const startLogout = () => {
	return (dispatch) => {
		localStorage.clear();
		dispatch(eventClearStateLogout() );
		dispatch( logout() );
	}
}




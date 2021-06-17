/**
 * Saber si estoy en modo production o dev
 */
const baseUrl = process.env.REACT_APP_API_URL;


/**
 * Esta funcion se encarga de hacer peticicones a los diferentes endpoint que no necesitan token de autentificacion.
 * 
 * @param {String} endpoint Es el Endpoint para saber a que ruta hacer la peticion.
 * @param {String} data Es la data que se va inviar al por el body al endpoin defenido
 * @param {String} method El metodo http que ocupa la peticion
 * @returns Retorna el llamado de la api pero solo el llamado el resultado del la peticon se soluciona donde se llame esta funcion
 */
const fetchSinToken = (endpoint, data, method = 'GET') => {

	const url = `${baseUrl}/${endpoint}`;
   
	if(method==='GET'){

		return fetch(url);

	}else{
		return fetch(url, { 
			method,
			headers:{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		});
	}

}


/**
 * Esta funcion se encarga de hacer peticicones a los diferentes endpoint  de la api 
 * que necesitan el token de autentificacion.
 * 
 * @param {String} endpoint Es el Endpoint para saber a que ruta hacer la peticion.
 * @param {String} data Es la data que se va inviar al por el body al endpoin defenido
 * @param {String} method El metodo http que ocupa la peticion
 * @returns Retorna el llamado de la api pero solo el llamado el resultado del la peticon se soluciona donde se llame esta funcion
 */
const fetchConToken = (endpoint, data, method = 'GET') => {

	const url = `${baseUrl}/${endpoint}`;
	const token = localStorage.getItem('token') || '';
   
	if(method==='GET'){

		return fetch(url , {
			method,
			headers: {
				'x-token' : token
			}

		} );

	}else{
		return fetch(url, { 
			method,
			headers:{
				'Content-Type': 'application/json',
				'x-token': token
			},
			body: JSON.stringify(data)
		});
	}

}




export {
	fetchConToken,
	fetchSinToken
}
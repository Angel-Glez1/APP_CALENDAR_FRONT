import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

	// React-Redux
	const dispatch = useDispatch();

	//TODO :: Auth - Login ( State y dispatch de login )
	const [formLoginValues, handleLoginInputChange] = useForm({ 
		lEmail: 'test@test.com', 
		lPassword: 'passtest' 
	});
	const { lEmail, lPassword } = formLoginValues;
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		dispatch(startLogin(lEmail, lPassword ));
	}


	//TODO :: Auth - Register ( State y dispatch de login )
	const [ formRegisterValues, handleRegisterInputChange] = useForm({ 
		rName: 'Naya Rivera', 
		rEmail: 'test3@test.com', 
		rPassword: 'passtest', 
		rPassword2: 'passtest'
	});
	const { rEmail, rName, rPassword, rPassword2 } = formRegisterValues;
	const handleRegisterSubmit = (e) => {
		e.preventDefault();
	
		if( rPassword !== rPassword2 ){
			return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
		}

		dispatch( startRegister( rName, rEmail, rPassword ) );
	}


	// JSX.....
	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={handleLoginSubmit}  >
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="lEmail"
								value={lEmail}
								onChange={handleLoginInputChange}

							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="lPassword"
								value={lPassword}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="submit"
								className="btnSubmit"
								value="Login"
							/>
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={ handleRegisterSubmit } >
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name="rName"
								value={rName}
								onChange={ handleRegisterInputChange }
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="rEmail"
								value={rEmail}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="rPassword"
								value={rPassword}
								onChange={handleRegisterInputChange}

							/>
						</div>

						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name="rPassword2"
								value={rPassword2}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className="form-group">
							<input
								type="submit"
								className="btnSubmit"
								value="Crear cuenta" />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
 

export const NavBar = () => {

	const {name} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const handleLogoutClick = () => {

		dispatch( startLogout() );
	}

	return (
		<div className="navbar navbar-dark bg-dark mb-4" >
			<span className="navbar-brand" >
				{name}
			</span>

			<button 
				className="btn btn-outline-danger"
				onClick={ handleLogoutClick }
			>

				<i className="fas fa-sign-out-alt"></i>
				<span className="ml-1">Logout</span>
			</button>
		</div>
	)
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
} from 'react-router-dom';
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PublicRoute } from './PublicRoute';
import { PrivateRouters } from './PrivateRouters';



export const AppRouter = () => {

	const { checking, uid } = useSelector(state => state.auth);
	const dispatch = useDispatch()

	// Saber si la session del usuario esta activa 
	useEffect(() => {
		dispatch(startChecking())
	}, [dispatch]);

	if(checking){
		return (<h3 className="alert alert-primary" > Espere... </h3>);
	};

	return (
		<Router>
			<div>
				<Switch>

					<PublicRoute    
						exact 
						path="/login" 
						isAuthenticated={ !!uid } 
						component={ LoginScreen } 
					/>

					<PrivateRouters 
						exact 
						path="/" 
						isAuthenticated={ !!uid } 
						component={ CalendarScreen }
					/>

					<Redirect 
						to="/login"
					/>
				</Switch>	
			</div>
		</Router>
	)
}

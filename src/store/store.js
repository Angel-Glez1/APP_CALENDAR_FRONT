import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

// Esto solo es para que podamos usar las redux-devtools del navegador.
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Este es el store de mi aplicacion.
export const store = createStore(
	rootReducer,
	composeEnhancers( 
		applyMiddleware( thunk )
	)
);


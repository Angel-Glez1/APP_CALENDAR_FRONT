/**
 * Mis types para mis diferentes reducers
 * 
 */

export const types = {

	//* Types for uiRecuder(windon Modal)
	uiOpenModal:  '[ui] Open Modal',
	uiCloseModal: '[ui] Close Modal',

	//* Types for calendarReducer
	eventAddNew:           '[event] Add new',
	eventStartAddNew:      '[event] Start Add new',
	eventClearActiveEvent: '[event] Clear Event',
	eventDeleted:		   '[event] Event Deleted',
	eventSetActive: 	   '[event] Set Active',
	eventUpdateEvent: 	   '[event] Event Update',
	eventLoaded: 		   '[event] Event loaded',
	eventClear:			   '[event] Event Clear',

	//* Types for authReducer 
	authCheckingFinish : 	'[auth] Finish Checking login state',
	authStartLogin : 		'[auth] Start login',
	authLogin : 			'[auth] Login',
	authStartRegister : 	'[auth] Start Register',
	authStartTokenRenew : 	'[auth] Start token renew',
	authLogout : 			'[auth] Logout',


} 
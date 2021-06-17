import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-message-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

	// react-redux
	const dispatch = useDispatch();
	const {events, activeEvent} = useSelector(state => state.calendar);
	const {uid} = useSelector(state => state.auth);
	

	// Obtener registros de la base de datos HACER EL GET...
	useEffect(() => {
		dispatch(eventStartLoading() )
	}, [dispatch])



	// Obtener la ultima vista donde estuvo el usuario.
	const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month' );

	// TODO::Open Modal
	const onDoubleClick = () => {
		dispatch( uiOpenModal());
	}


	const onSelectEvent = (e) => {
		dispatch( eventSetActive(e) );

	}

	const onViewChange = (e) => {
		setlastView( e );
		localStorage.setItem('lastView', e);
	}


	const onSelectSlot = (e) => {
		
		dispatch( eventClearActiveEvent()  );
	}


	// Estilos de los recordatorios 
	const eventStyleCalendar = (event, start,end, isSelected) => {
	

		const style = {
			backgroundColor: (uid === event.user._id) ? '#6610f2' : '#6c757d',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white'
		}

		return {
			style
		}
	}

	return (
		<div className="calendar-screen">
			<NavBar />
			<Calendar
				endAccessor="end"
				events={ events }
				eventPropGetter={ eventStyleCalendar }
				messages={ messages }
				localizer={ localizer }
				startAccessor="start"
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={ onSelectEvent } // Evento al dar un solo click
				onSelectSlot={onSelectSlot}
				selectable={true}
				onView={ onViewChange }
				view={lastView}
				components={{
					event : CalendarEvent
				}}
			/>

			<AddNewFab/>
			{ activeEvent && <DeleteEventFab/>}
			<CalendarModal/>

			
		</div>
	)
}

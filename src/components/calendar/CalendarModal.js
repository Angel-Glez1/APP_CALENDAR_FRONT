import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { 
	eventClearActiveEvent,
	startEventAddNew, 
	startUpdateEvent 
} from '../../actions/events';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};
Modal.setAppElement('#root');
const now = moment().minutes(0).seconds(0).add(1, 'hours'); // Fecha y hora actual
const nowPlusOneHour = now.clone().add(1, 'hours') // Fecha y hora actual mas una ora

const initEvent = { title: '', notes: '', start: now.toDate(), end: nowPlusOneHour.toDate() }


//*.... JSX ...*//
export const CalendarModal = () => {

	// react-redux
	const { modalOpen } = useSelector(state => state.ui);
	const { activeEvent } = useSelector(state => state.calendar);
	const dispatch = useDispatch();


	// State para controlar la info de los input de tipo fecha
	const [dateStart, setDateStart] = useState(now.toDate())
	const [dateEnd, setDateEnd] = useState(nowPlusOneHour.toDate());
	const [titleValid, setTitleValid] = useState(true)

	// State para la data del formulario
	const [formValues, setFormValues] = useState(initEvent);
	const {  title,  notes,  start,  end } = formValues;

	// Este efecto es para mostar la info del evento seleccionado en el formulario
	useEffect(() => {
		if(activeEvent){
			setFormValues(activeEvent)

		}else{

			setFormValues(initEvent)
		}
	}, [activeEvent, setFormValues])

	// Obtener lo values de los campos del form
	const handleInputChage = ({ target }) => {
		setFormValues({ ...formValues, [target.name] : target.value  });
	}


	const closeModal = () => {
		// TODO:: CERRAR EN MODAL
		dispatch( uiCloseModal() );
		dispatch( eventClearActiveEvent() );
		setFormValues(initEvent);

	}

	// Setear Hora de inicio del evento
	const handleStartDateChange = (e) => {
		setDateStart(e);
		setFormValues({ ...formValues, start: e });
	}

	// Seter Fin de la fecha del evento
	const handleDateEnd = (e) => {
		setDateEnd(e);
		setFormValues({ ...formValues, end: e });
	}

	// Add new Event an calendar
	const handleAddEvent = (e) => {
		e.preventDefault();

		const momentStart = moment(start);
		const momentEnd = moment(end);

		if (momentStart.isSameOrAfter(momentEnd)) {
			Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
			return;
		}

		if (title.trim().length < 2) {
			return setTitleValid(false);
		}


		if(activeEvent) 
		{
			//TODO :: Actulizar Evento
			dispatch(startUpdateEvent(formValues) )
		}
		else 
		{
			//TODO :: Make new event
			dispatch(startEventAddNew( formValues ));
		}
		
		setTitleValid(true);
		closeModal();
		
	}

	return (

		<Modal
			isOpen={ modalOpen } // Abir el modal
			onRequestClose={closeModal} // Cierra el modal
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>

			<h1> { activeEvent ? 'Editando Evento' : 'Nuevo Evento' } </h1>
			<hr />
			<form className="container" onSubmit={handleAddEvent} >

				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={dateStart}
						className="form-control"

					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						onChange={handleDateEnd}
						minDate={dateStart}
						value={dateEnd}
						className="form-control"
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={ `form-control ${!titleValid && 'is-invalid' }` }
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						onChange={ handleInputChage }
						value={title}
					/>
					<small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
				</div>

				<div className="form-group">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						onChange={ handleInputChage }
						value={notes}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">Información adicional</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>

			</form>
		</Modal>

	)
}

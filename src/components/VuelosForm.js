import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from 'react';
import { VuelosContext } from '../context/VuelosContext';

const VuelosForm = ({ selectedVuelo, onSubmitSuccess, onHide }) => {
  console.log("VuelosForm received selectedVuelo:", selectedVuelo);
  const { vuelos, setVuelos } = useContext(VuelosContext);
  const [formData, setFormData] = useState({
    flightNumber: '',
    date: '',
    time: '',
    seats: 0,
    occupiedSeats: 0
  });
  const [error, setError] = useState('');

  // Validación de formato AZ1234
  const validateFlightNumber = (value) => {
    const regex = /^[A-Z]{2}\d{4}$/;
    if (!regex.test(value)) {
      setError('Formato inválido (ej: AZ1234)');
      return false;
    }
    setError('');
    return true;
  };

  const handleAgregarVuelo = (vuelo, newFlight) => {
    // Verificar si el número de vuelo ya existe para este destino
    const flightExists = vuelo.flights.some(f => f.number === newFlight.number);
    
    if (flightExists) {
      setError('Este número de vuelo ya existe para este destino');
      return false;
    }

    // Actualizar la lista de vuelos con el nuevo vuelo
    const vuelosActualizados = vuelos.map((v) => {
      if (v.destination === vuelo.destination) {
        return {
          ...v,
          flights: [...v.flights, newFlight]
        };
      }
      return v;
    });

    // Actualizar el contexto con los vuelos actualizados
    setVuelos(vuelosActualizados);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que se haya seleccionado un destino
    if (!selectedVuelo) {
      alert('Seleccione un destino primero');
      return;
    }

    // Validar formato del número de vuelo
    if (!validateFlightNumber(formData.flightNumber)) return;

    // Validar campos obligatorios
    if (!formData.date) {
      setError('La fecha es obligatoria');
      return;
    }
    
    if (!formData.time) {
      setError('La hora es obligatoria');
      return;
    }

    if (parseInt(formData.seats) <= 0) {
      setError('El número de plazas debe ser mayor que cero');
      return;
    }

    // Calcular plazas disponibles
    const availableSeats = parseInt(formData.seats) - parseInt(formData.occupiedSeats);

    // Crear el objeto del nuevo vuelo
    const newFlight = {
      number: formData.flightNumber,
      date: formData.date,
      time: formData.time,
      seats: parseInt(formData.seats),
      occupiedSeats: parseInt(formData.occupiedSeats),
      availableSeats: availableSeats // Añadir plazas disponibles
    };

    // Intentar agregar el vuelo
    if (handleAgregarVuelo(selectedVuelo, newFlight)) {
      // Resetear el formulario si el vuelo se agregó correctamente
      setFormData({
        flightNumber: '',
        date: '',
        time: '',
        seats: 0,
        occupiedSeats: 0
      });
      
      // Llamar a la función de éxito si existe
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Cerrar el modal si existe la función para hacerlo
      if (onHide) {
        onHide();
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='container'>
      <Form.Group className="mb-3">
        <Form.Label>Destino</Form.Label>
        <Form.Text className="ms-2 fw-bold">{selectedVuelo?.destination}</Form.Text>
      </Form.Group>
      
      {/* Campo Número de Vuelo */}
      <Form.Group className="mb-3">
        <Form.Label>Número de vuelo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: AZ1234"
          value={formData.flightNumber}
          onChange={(e) => {
            setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() });
            validateFlightNumber(e.target.value.toUpperCase());
          }}
          maxLength={6}
          required
        />
        {error && <div className="text-danger">{error}</div>}
      </Form.Group>
      
      {/* Fecha y Hora */}
      <Form.Group className="mb-3">
        <Form.Label>Fecha</Form.Label>
        <Form.Control
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Hora</Form.Label>
        <Form.Control
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />
      </Form.Group>
      
      {/* Plazas */}
      <Form.Group className="mb-3">
        <Form.Label>Plazas disponibles</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={formData.seats}
          onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
          required
        />
      </Form.Group>
      
      <div className="d-flex justify-content-between">
        <Button variant="primary" type="submit" disabled={!!error}>
          Agregar vuelo
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
};

export default VuelosForm;
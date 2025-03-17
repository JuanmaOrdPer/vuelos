import React, { useContext, useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { VuelosContext } from '../context/VuelosContext';

function VuelosAlerts() {
  const { vuelos } = useContext(VuelosContext);
  const [lowSeatAlerts, setLowSeatAlerts] = useState([]);

  // Detectar vuelos con pocas plazas disponibles
  useEffect(() => {
    if (!vuelos) return;

    const alerts = [];

    vuelos.forEach((vuelo) => {
      vuelo.flights.forEach((flight) => {
        const availableSeats = flight.seats - flight.occupiedSeats;

        if (availableSeats >= 0 && availableSeats < 3) {
          alerts.push({
            id: flight.number,
            destination: vuelo.destination,
            availableSeats,
            variant: availableSeats === 0 ? 'danger' : 'warning',
          });
        }
      });
    });

    setLowSeatAlerts(alerts);
  }, [vuelos]);

  if (lowSeatAlerts.length === 0) return null;

  return (
    <Container className="mt-3">
      {lowSeatAlerts.map((alert, index) => (
        <Alert key={index} variant={alert.variant} className="mb-2">
          <Alert.Heading className="h5">¡Últimas plazas disponibles!</Alert.Heading>
          <p className="mb-0">
            {alert.availableSeats===0
            ?
            `No quedan plazas disponibles para el vuelo ${alert.id} con destino ${alert.destination}.`
            :
            `Quedan ${alert.availableSeats} plazas disponibles para el vuelo ${alert.id} con destino ${alert.destination}.`
            }
          </p>
        </Alert>
      ))}
    </Container>
  );
}

export default VuelosAlerts;

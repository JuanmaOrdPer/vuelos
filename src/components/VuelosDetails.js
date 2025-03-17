import React, { useState, useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useContext } from "react";
import { VuelosContext } from "../context/VuelosContext";

function VuelosDetails({ vuelo, flight }) {
  const { vuelos, setVuelos } = useContext(VuelosContext);
  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);

  useEffect(() => {
    if (flight) {
      setOccupiedSeats(flight.occupiedSeats || 0);
      setAvailableSeats(flight.seats - (flight.occupiedSeats || 0));
    }
  }, [flight]);



const handleReservar = () => {
    if (availableSeats > 0) {
        setOccupiedSeats(occupiedSeats + 1);
        setAvailableSeats(availableSeats - 1);

        const updatedVuelos = vuelos.map(v =>
            v.destination === vuelo.destination
                ? {
                    ...v,
                    flights: v.flights.map(f =>
                        f.number === flight.number
                            ? { ...f, occupiedSeats: f.occupiedSeats + 1 }
                            : f
                    )
                }
                : v
        );

        setVuelos(updatedVuelos);
    }
};

const handleLiberar = () => {
    if (occupiedSeats > 0) {
        setOccupiedSeats(occupiedSeats - 1);
        setAvailableSeats(availableSeats + 1);

        const updatedVuelos = vuelos.map(v =>
            v.destination === vuelo.destination
                ? {
                    ...v,
                    flights: v.flights.map(f =>
                        f.number === flight.number
                            ? { ...f, occupiedSeats: f.occupiedSeats - 1 }
                            : f
                    )
                }
                : v
        );

        setVuelos(updatedVuelos);
    }
};

  return (
    <Card> 
      <Card.Header className="text-center">
        {vuelo ? `Destino: ${vuelo.destination}` : "Detalles del Vuelo"}
      </Card.Header>
      <Card.Body>
        {flight ? (
          <>
            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Número</th>
                  <th>Asientos</th>
                  <th>Plazas Disponibles</th>
                  <th>Plazas Ocupadas</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>{flight.date}</td>
                  <td>{flight.time}</td>
                  <td>{flight.number}</td>
                  <td>{flight.seats}</td>
                  <td>{availableSeats}</td>
                  <td>{occupiedSeats}</td>
                </tr>
              </tbody>
            </Table>
            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button
                variant="success"
                onClick={handleReservar}
                disabled={availableSeats <= 0}
              >
                Reservar
              </Button>
              <Button
                variant="danger"
                onClick={handleLiberar}
                disabled={occupiedSeats <= 0}
              >
                Liberar
              </Button>
            </div>
          </>
        ) : (
          <p>No hay vuelos disponibles</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default VuelosDetails;

import React, { useContext, useState } from 'react';
import { Button, Card, Container, Modal, Table } from 'react-bootstrap';
import { VuelosContext } from '../context/VuelosContext';
import { ListGroup } from 'react-bootstrap';
import VuelosDetails from './VuelosDetails';
import VuelosAdd from './VuelosAdd';

function VueloList() {
    // Context and state management
    const { vuelos, setVuelos } = useContext(VuelosContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedVuelo, setSelectedVuelo] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    // Handler for selecting a flight - updates state and shows details modal
    const handleVueloClick = (vuelo, flight) => {
        setSelectedVuelo(vuelo);
        setSelectedFlight(flight);
        setShowModal(true);
    };
    
    // Handler for closing the details modal
    const handleCloseModal = () => {
        setShowModal(false);        
    };

    // Handler for closing the add flight modal
    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    // Function to delete a flight from a destination
    const eliminarVuelo = (vuelo, flight) => {
        const vuelosActualizados = vuelos.map((v) => {
            if (v.destination === vuelo.destination) {
                return {
                    ...v,
                    flights: v.flights.filter((f) => f.number !== flight.number),
                };
            }
            return v;
        });
        setVuelos(vuelosActualizados);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ width: '50rem', padding: '1rem', borderRadius: '0.5rem' }}>      
            <ListGroup horizontal variant="flush" className="m-5">
                {vuelos.map((vuelo, index) => (
                    <ListGroup.Item key={index} className="mb-3">
                        <Card key={"vuelo" + vuelo.destination}>
                      
                            <Card.Header className="vuelos_header text-black text-center text-uppercase">
                                {vuelo.destination}
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover responsive>
                                    <thead className="text-center">
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Numero</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vuelo.flights.map((flight, fIndex) => (
                                            <tr key={fIndex}>
                                                <td>{flight.date}</td>
                                                <td>{flight.number}</td>
                                                <td className="d-flex justify-content-between gap-2"> 
                                                    <Button 
                                                        variant="success" 
                                                        onClick={() => handleVueloClick(vuelo, flight)}
                                                    >
                                                        Seleccionar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        className="float-end" 
                                                        onClick={() => eliminarVuelo(vuelo, flight)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                              
                                <Button 
                                    variant="success" 
                                    className="float-center" 
                                    onClick={() => {
                                        console.log("Setting selected vuelo:", vuelo); // Add this for debugging
                                        setSelectedVuelo(vuelo);
                                        setShowAddModal(true);
                                    }}
                                >
                                    Agregar Vuelo
                                </Button>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                size="lg" 
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedVuelo && `Detalles del Vuelo: ${selectedVuelo.destination}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    {selectedVuelo && selectedFlight && (
                        <VuelosDetails vuelo={selectedVuelo} flight={selectedFlight} />
                    )}
                </Modal.Body>
            </Modal>   

            <VuelosAdd 
                show={showAddModal} 
                onHide={handleCloseAddModal} 
                selectedVuelo={selectedVuelo}
            /> 
        </Container>
    );
}

export default VueloList;
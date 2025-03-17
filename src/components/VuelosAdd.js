import React from 'react';
import { Modal } from 'react-bootstrap';
import VuelosForm from './VuelosForm';

function VuelosAdd({ show, onHide, selectedVuelo }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedVuelo ? `Añadir Vuelo a ${selectedVuelo.destination}` : 'Añadir Vuelo'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VuelosForm 
          selectedVuelo={selectedVuelo} 
          onSubmitSuccess={() => {
            console.log("Vuelo añadido correctamente");
          }} 
          onHide={onHide} 
        />
      </Modal.Body>
    </Modal>
  );
}

export default VuelosAdd;
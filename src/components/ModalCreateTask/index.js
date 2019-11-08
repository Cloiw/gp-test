import React, {useRef, useState} from 'react';
import { addTask } from '../../store/actions/tasks_action';
import { connect } from 'react-redux';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './ModalCreateTask.css'

const ModalCreateTask = ({ show, onHide, addTask }) => {
  const textRef = useRef(null);
  const dateRef = useRef(null);

  const handleSubmit = () => {
    if(textRef.current.value === '' || dateRef.current.value === ''){
      return
    }
    addTask(textRef.current.value,dateRef.current.value);
    onHide();
  };

  return(
    <div>
      <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Fecha de vencimiento</Form.Label>
            <Form.Control  required type="date" ref={dateRef} />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Ingresa una fecha
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" placeholder="Escribe una descripción" ref={textRef} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button onClick={() => {handleSubmit()}}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
}

export default connect(null, { addTask }) (ModalCreateTask);







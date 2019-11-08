import React, { useRef } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import {  FiAlertCircle } from 'react-icons/fi';
import { FaRegCheckCircle, FaRegClock } from 'react-icons/fa';
import './TaskCard.css';

const TaskCard = (props) => {
  const checkRef = useRef(null);
  const { creationDate, expirationDate, text, status, id } = props
  return (
    <Card border={status === 1 ? "warning" : status === 0 ? "success" : "danger"} className="text-center">
      <Card.Body>
        <Row bsPrefix="align-center row">
          <Col xs={12} md={2} bsPrefix="check-align col">
            <Form.Group controlId={id}>
              <Form.Check ref={checkRef} type="checkbox" />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} bsPrefix="text-align-top col">
            <div className="align-left">
              <Card.Text>
                {text}
              </Card.Text>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="align-right">
              <Card.Text>
                {new Date(expirationDate).toISOString().split('T')[0]}
              </Card.Text>
            </div>
          </Col>
          <Col xs={12} md={2}>
            {status === 1 ? <FaRegClock size={48} color="#ffc107" /> : 
             status === 0 ? <FaRegCheckCircle size={48} color={"#28a745"} /> : 
             <FiAlertCircle size={48} color={"#dc3545"} />}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-muted">Fecha de creación {new Date(creationDate).toISOString().split('T')[0]}</Card.Footer>
    </Card>
  )
}

export default TaskCard;
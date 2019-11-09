import React, { useRef } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { checkedTasks } from '../../store/actions/tasks_action';
import { connect } from 'react-redux';
import {  FiAlertCircle } from 'react-icons/fi';
import { FaRegCheckCircle, FaRegClock } from 'react-icons/fa';
import './TaskCard.css';
import ExpirationDate from '../ExpirationDate';

const TaskCard = ({ creationDate, expirationDate, text, status, id, checkedTasks }) => {
  const checkRef = useRef(null);
  const todaysDate = new Date().toISOString().split('T')[0];
  const todaysDateTimeStamp = new Date(todaysDate).getTime();

  const handleCheck = (id) => {
    checkedTasks(checkRef.current.checked, id);
  }

  const borderStatus = () => {
    if( status === 0 ) {
      return "success"
    }
    if ( status === 1 && todaysDateTimeStamp < expirationDate ) {
      return "warning"
    }
    return "danger"
  }

  return (
    <Card border={borderStatus()} className="text-center">
      <Card.Body>
        <Row bsPrefix="align-center row">
          <Col xs={12} md={2} bsPrefix="check-align col">
            <Form.Group controlId={id}>
              { status !== 0 && <Form.Check onChange={()=>handleCheck(id)} ref={checkRef} type="checkbox" /> }
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
              <ExpirationDate id={id} status={status} date={new Date(expirationDate).toISOString().split('T')[0]} />
            </div>
          </Col>
          <Col xs={12} md={2}>
            {status === 1 && todaysDateTimeStamp < expirationDate && <FaRegClock size={48} color="#ffc107" /> }
            {status === 1 && todaysDateTimeStamp > expirationDate && <FiAlertCircle size={48} color={"#dc3545"} /> }
            {status === 0 && <FaRegCheckCircle size={48} color={"#28a745"} /> }
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-muted">Fecha de creación {new Date(creationDate).toISOString().split('T')[0]}</Card.Footer>
    </Card>
  )
}

export default connect(null, { checkedTasks }) (TaskCard);
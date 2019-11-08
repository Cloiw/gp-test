import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const TaskCard = (props) => {
  const { creationDate, expirationDate, text, status, id } = props
  return (
    <Card className="text-center">
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <Form.Group controlId={id}>
      <Form.Check type="checkbox" label="Seleccionar" />
    </Form.Group>
    <Card.Text>
      {text}
    </Card.Text>
    <Button variant="primary">Liberar</Button>
  </Card.Body>
  <Card.Footer className="text-muted">Fecha de creación {creationDate}</Card.Footer>
</Card>
  )
}

export default TaskCard;
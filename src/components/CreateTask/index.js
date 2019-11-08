import React from 'react';
import ModalCreateTask from "../ModalCreateTask";
import { ButtonToolbar, Button } from 'react-bootstrap';


const CreateTask = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button variant="light" size="lg" onClick={() => setModalShow(true)}>
        Crear Tarea
      </Button>
      <ModalCreateTask
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>

  );
}

export default CreateTask;
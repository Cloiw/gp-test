import React, { useRef } from 'react';
import { sortTasks } from '../../store/actions/tasks_action';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import './SortTask.css'


const SortTask = ({ sortTasks, tasksData }) => {
  const sortOption = useRef(null);
  const handleChange= () => {
    console.log(sortOption.current.value);
    sortTasks(sortOption.current.value, tasksData.tasks)
  }

  return (
    <Form.Group>
      <Form.Control bsPrefix={"btn-light form-control"} ref={sortOption} onChange={handleChange}defaultValue={"created"} as="select">
        <option value="created" disabled>Ordenar</option>
        <option value="created">Fecha de creación</option>
        <option value="expired">Fecha de vencimiento</option>
        <option value="status">Estado</option>
      </Form.Control>
    </Form.Group>
  );
}

const mapStateToProps = state => {
  return {
    tasksData : state.tasks_reducer
  }
}

export default connect(mapStateToProps, { sortTasks }) (SortTask);

import React, { useRef } from 'react';
import { filterTasks } from '../../store/actions/tasks_action';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

const FilterTask = ({ filterTasks }) => {
  const filterOption = useRef(null);
  const handleChange= () => {
    filterTasks(filterOption.current.value)
  }

  return (
    <Form.Group>
      <Form.Control bsPrefix={"btn-light form-control"} ref={filterOption} onChange={handleChange} defaultValue={"none"} as="select">
        <option value="none" disabled>Filtrar</option>
        <option value="none" >Ver todas</option>
        <option value="released">Liberadas</option>
        <option value="pending">Pendientes</option>
        <option value="expired">Atrasadas</option>
      </Form.Control>
    </Form.Group>
  );
}

export default connect(null, { filterTasks }) (FilterTask);

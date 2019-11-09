import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateDate } from '../../store/actions/tasks_action';
import './ExpirationDate.css'

const ExpirationDate = ({date, status, updateDate, id}) => {
  const dateRef = useRef(null);
  const [currentDate, setDate] = React.useState(date);
  const newDate = () => {
    setDate(dateRef.current.value);
    updateDate(id, dateRef.current.value);
  }
  return (
    <>
    {status !== 0 ? 
      <div className="input-date">
        <Form.Control ref={dateRef} onChange={newDate} value={currentDate} type="date" />
      </div> :
      <p className="p-date"> {date.split('-').reverse().join('-')} </p>}
    </>
  )
}

export default connect(null, { updateDate }) (ExpirationDate);

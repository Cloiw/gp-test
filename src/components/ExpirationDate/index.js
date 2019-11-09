import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateDate } from '../../store/actions/tasks_action';
import { FaCalendarAlt } from 'react-icons/fa';
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
      <div className="input-date calendar-icon">
        <Form.Control ref={dateRef} onChange={newDate} value={currentDate} type="date" />
        <FaCalendarAlt size={24} color="#cccccc" /> 
      </div> :
      <div className="calendar-icon">
        <p className="p-date"> {date.split('-').reverse().join('-')} </p>
        <FaCalendarAlt size={24} color="#cccccc" /> 
      </div>}
    </>
  )
}

export default connect(null, { updateDate }) (ExpirationDate);

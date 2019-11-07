import React, {useRef} from 'react';
import { addTask } from '../../store/actions/tasks_action';
import { connect } from 'react-redux'

const CreateTask = ({ addTask }) => {
  const textRef = useRef(null);

  return(
  <div>
  <input type="text" ref={textRef}  />
  <button onClick={() => {addTask(textRef.current.value)}}>Guardar</button>
  </div>
  )
}

export default connect(null, { addTask }) (CreateTask);

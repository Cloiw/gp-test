import React from 'react';
import { Provider, connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import store from '../../store';
import CreateTask from '../CreateTask';
import TaskCard from '../TaskCard';
import { getTasks } from '../../store/actions/tasks_action';

class ContentView extends React.Component {
  componentDidMount(){
    const { getTasks } = this.props;
    getTasks()
  }

  render (){
    const { tasksData } = this.props;
    getTasks()
    return (
      <Provider store={store}>
        <Container>
          <h1>Cosas por hacer  {new Date().toISOString().split('T')[0]}</h1>
        <CreateTask/>
        {tasksData.tasks.map(e => {
           return <TaskCard key={e.id} text={e.text} creationDate={e.creation_date} expirationDate={e.expiration_date} status={e.status}/>
        })}
        </Container>
      </Provider>
    )
  }
}

const mapStateToProps = state => {
  console.log("map", state)
  return {
    tasksData : state.tasks_reducer,
  }
}

export default connect(mapStateToProps, {getTasks}) (ContentView);
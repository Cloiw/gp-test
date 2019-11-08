import React from 'react';
import { Provider, connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import store from '../../store';
import CreateTask from '../CreateTask';
import TaskCard from '../TaskCard';
import { getTasks, updateStatusTask, releaseCheckedTasks } from '../../store/actions/tasks_action';

class ContentView extends React.Component {
  async componentDidMount(){
    const { getTasks, updateStatusTask, tasksData } = this.props;
    getTasks()
    updateStatusTask(tasksData.tasks, tasksData.toUpdate)
  }

  render (){
    const { tasksData, releaseCheckedTasks } = this.props;
    return (
      <Provider store={store}>
        <Container>
          <h1>Cosas por hacer  {new Date().toISOString().split('T')[0]}</h1>
        <Row>
          <Col>
            <Button onClick={() => releaseCheckedTasks(tasksData.checkedTasks)}variant="outline-dark" size="lg">Liberar seleccionadas</Button>
          </Col>
          <Col>
            <CreateTask/>
          </Col>
        </Row>
        {tasksData.tasks.map(e => {
           return <TaskCard key={e.id} id={e.id} text={e.text} creationDate={e.creation_date} expirationDate={e.expiration_date} status={e.status}/>
        })}
        </Container>
      </Provider>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasksData : state.tasks_reducer
  }
}

export default connect(mapStateToProps, {getTasks, updateStatusTask, releaseCheckedTasks}) (ContentView);
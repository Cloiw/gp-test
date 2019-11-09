import React from 'react';
import { Provider, connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import store from '../../store';
import CreateTask from '../CreateTask';
import TaskCard from '../TaskCard';
import SortTask from '../SortTask';
import { getTasks, releaseCheckedTasks } from '../../store/actions/tasks_action';
import './ContentView.css'

class ContentView extends React.Component {
  async componentDidMount(){
    const { getTasks } = this.props;
    getTasks()
  }

  render (){
    const { tasksData, releaseCheckedTasks } = this.props;
    const date = new Date().toISOString().split('T')[0]
    return (
      <Provider store={store}>
        <Container>
        <Row bsPrefix="row-title row">
          <Col md={8} xs={12}>
            <h1>Cosas por hacer</h1>
          </Col>
          <Col bsPrefix="date-col col" md={4} xs={12}>
            <h2>Hoy : {date.split('-').reverse().join('/')} </h2>
          </Col>
        </Row>
        <Row>
          <Col md={4} xs={12}>
            <div className={"btn-toolbar-top"}>
              <Button onClick={() => releaseCheckedTasks(tasksData.checkedTasks)}variant="light" size="lg">Liberar seleccionadas</Button>
            </div>
          </Col>
          <Col md={4} xs={12}>
            <CreateTask />
          </Col>
          <Col md={4} xs={12}>
            <SortTask />
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

export default connect(mapStateToProps, {getTasks, releaseCheckedTasks}) (ContentView);
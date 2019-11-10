import React from 'react';
import { Provider, connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import store from '../../store';
import CreateTask from '../CreateTask';
import TaskCard from '../TaskCard';
import SortTask from '../SortTask';
import FilterTask from '../FilterTask';
import { getTasks, releaseCheckedTasks, sortTasks, filterAndSort } from '../../store/actions/tasks_action';
import './ContentView.css'

class ContentView extends React.Component {
  async componentDidMount() {
    const { getTasks } = this.props;
    getTasks()
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasksData, filterAndSort } = this.props;

    if (prevProps.tasksData.tasks !== tasksData.tasks || 
      prevProps.tasksData.filterBy !== tasksData.filterBy || 
      prevProps.tasksData.sortBy !== tasksData.sortBy) {
        filterAndSort(tasksData.sortBy, tasksData.filterBy, tasksData.tasks)
      };
  }

  render (){
    const { tasksData, releaseCheckedTasks } = this.props;
    console.log(tasksData.resultTasks, "lo que llega al render")
    const date = new Date().toISOString().split('T')[0]
    return (
      <Provider store={store}>
        <Container>
        <Row bsPrefix="row-title row">
          <Col md={8} xs={12}>
            <h1>Cosas por Hacer</h1>
          </Col>
          <Col bsPrefix="date-col col" md={4} xs={12}>
            <h2>Hoy : {date.split('-').reverse().join('/')} </h2>
          </Col>
        </Row>
        <Row bsPrefix="row-btns row">
          <Col md={3} xs={12}>
            <div className={"btn-toolbar-top"}>
              <Button onClick={() => releaseCheckedTasks(tasksData.checkedTasks)}variant="light" size="lg">Liberar Seleccionadas</Button>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <CreateTask />
          </Col>
          <Col md={3} xs={12}>
            <FilterTask />
          </Col>
          <Col md={3} xs={12}>
            <SortTask />
          </Col>
        </Row>
        {tasksData.resultTasks.map(e => {
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

export default connect(mapStateToProps, {getTasks, releaseCheckedTasks, sortTasks, filterAndSort}) (ContentView);
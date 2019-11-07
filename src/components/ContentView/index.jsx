import React from 'react';
import { Provider, connect } from 'react-redux';
import store from '../../store';
import CreateTask from '../CreateTask';
import TaskContainer from '../TaskContainer';
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
        <div className="App">
          <h1>Cosas por hacer</h1>
        <CreateTask/>
        {tasksData.tasks.map(e => {
           return <TaskContainer text={e.text}/>
        })}
        </div>
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
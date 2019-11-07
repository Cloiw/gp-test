import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'
import tasks_reducer from './reducers/tasks_reducer';


const reducers = combineReducers({
  tasks_reducer
})

const store = createStore(
  reducers, applyMiddleware(ReduxPromise)
);

export default store;
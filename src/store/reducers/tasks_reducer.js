
const initialState = { 
  tasks: []
 };
 
export default ( state = initialState, action ) => {
  switch (action.type) {
    case 'ADD_TASK':
      let tasks = state.tasks
      let newTask = action.payload
      tasks.push(newTask)
      return Object.assign({},state,{
        newTask: action.payload,
        tasks: tasks
      });

    case 'GET_TASKS':
      return Object.assign({},state,{
        tasks: action.payload
      });

    default : return state
  }
  
}
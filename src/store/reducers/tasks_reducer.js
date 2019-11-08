
const initialState = { 
  tasks: [],
  toUpdate: 0,
  checkedTasks: {}
 };
 
export default ( state = initialState, action ) => {
  switch (action.type) {
    case 'ADD_TASK':
      let tasks = state.tasks
      let newTask = action.payload
      tasks.push(newTask)
      return Object.assign({},state,{
        newTask: action.payload,
        tasks: tasks,
        toUpdate: state.tasks.length
      });

    case 'GET_TASKS':
      return Object.assign({},state,{
        tasks: action.payload,
        toUpdate: action.payload.length
      });

    case 'UPDATE_STATUS_TASK':
      console.log("llego")
        return Object.assign({},state,{
          toUpdate: action.payload
        });
    
    case 'CHECKED_TASKS':
        let checkedTasks = state.checkedTasks;
        let addCheck = action.payload;
        let currentId = Object.keys(addCheck);
        let currentValue = Object.values(addCheck)[0];

        if (checkedTasks.hasOwnProperty(currentId) ){
          checkedTasks[currentId] = currentValue;
        }

        if (Object.keys(checkedTasks).length === 0 || !checkedTasks.hasOwnProperty(currentId) ) {
          checkedTasks = Object.assign(checkedTasks, {
            [currentId] : currentValue
          })
        }

        return Object.assign({},state,{
          checkedTasks: checkedTasks
        })
    
    case 'RELEASE_CHECKED_TASK':
        return Object.assign({},state,{
          releasedTasks: action.payload
        })
      

    default : return state
  }
  
}
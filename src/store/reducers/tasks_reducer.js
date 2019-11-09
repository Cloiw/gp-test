const initialState = { 
  tasks: [],
  checkedTasks: {},
  releasedTasks: [],
  updatedDates: []
 };
 
export default ( state = initialState, action ) => {
  switch (action.type) {
    case 'ADD_TASK':
      let tasks = [...state.tasks];
      const newTask = action.payload;
      tasks.push(newTask);
      return Object.assign({},state,{
        newTask: action.payload,
        tasks: tasks,
      });

    case 'GET_TASKS':
      return Object.assign({},state,{
        tasks: action.payload,
        releasedTasks: state.releasedTasks
      });

    case 'SORT_TASKS':
      return Object.assign({},state,{
        tasks: action.payload
      });

    case 'UPDATE_DATE':
      let updatedDates = [...state.updatedDates];
      const newUpdateDate = action.payload;
      updatedDates.push(newUpdateDate)

      return Object.assign({},state,{
        updatedDates: updatedDates
      });
    
    case 'CHECKED_TASKS':
      let checkedTasks = {...state.checkedTasks};
      const addCheck = action.payload;
      const currentId = Object.keys(addCheck);
      const currentValue = Object.values(addCheck)[0];
      if(currentValue === false){
        if (checkedTasks.hasOwnProperty(currentId) ){
          delete checkedTasks[currentId]
        }
        return Object.assign({},state,{
          checkedTasks: checkedTasks
        })
      }

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
      let currentTasks = [...state.tasks];
      for (let i = 0; i < currentTasks.length; i++ ) {
          if(state.checkedTasks.hasOwnProperty(currentTasks[i].id)){
            currentTasks[i].status = 0;
        }
      }
      return Object.assign({},state,{
        tasks: currentTasks,
      })
      
    default : return state
  }
  
}
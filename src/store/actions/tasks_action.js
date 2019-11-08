export const getTasks = () => {
  const result = fetch('http://localhost:3004/tasks').then(res=> {
    return res.json()
  })
  return {
    type: 'GET_TASKS',
    payload: result
  }
}

export const checkedTasks = (isChecked, id) => {
  return {
    type: 'CHECKED_TASKS',
    payload: { [id]: isChecked }
  }
}

export const sortTasks = ( sortBy, data ) => {
  let orderResult;
  if ( sortBy === 'expired' ) {
    orderResult = data.sort((a, b) => {
    return  a.expiration_date - b.expiration_date
    }); 
  } else if ( sortBy === 'status' ) {
    orderResult = data.sort((a, b) => {
      return b.status - a.status
    })
  } else if ( sortBy === 'created' ) {
    orderResult = data.sort((a, b) => {
      return b.creation_date - a.creation_date
    })
  }
  return {
    type: 'SORT_TASKS',
    payload: orderResult
  }
}

export const releaseCheckedTasks = ( checkedTasks ) => {
  let objectLength = Object.keys(checkedTasks).length;
  console.log(checkedTasks, objectLength)
  let updatedTasks = [];
  for( let i = 1; i <= objectLength; i++) {
    let index = i - 1;
    let taskId = Object.keys(checkedTasks)[index];
    if( checkedTasks[taskId] ) {
        fetch(`http://localhost:3004/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 0,
        })
      }).then(res => {
          res.json().then(res=>{
            updatedTasks.push(res)
          })
      })
    }
  }

  return {
    type: 'RELEASE_CHECKED_TASK',
    payload: updatedTasks
  }
}


export const updateStatusTask = (tasks,number) => {
  // const currentDate = new Date().toISOString().split('T')[0];
  // const ccurrentDateToTimeStamp = new Date(currentDate).getTime();
  return {
    type: 'UPDATE_STATUS_TASK',
    payload: tasks.length
  }
}

export const addTask = (text,expiration_date) => {
  const expirationToTimeStamp = new Date(expiration_date).getTime();
  const creationDate = new Date().toISOString().split('T')[0];
  const creationDateToTimeStamp = new Date(creationDate).getTime();
  const add = fetch('http://localhost:3004/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        creation_date: creationDateToTimeStamp,
        expiration_date: expirationToTimeStamp,
        status: 1,
        text: text,
      })
    }).then(res => {
      return res.json()
    })
  return {
    type: 'ADD_TASK',
    payload: add
  }
}
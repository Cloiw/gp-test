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
  for( let i = 0; i < objectLength; i++) {
    let taskId = Object.keys(checkedTasks)[i];
    if( checkedTasks[taskId] ) {
        fetch(`http://localhost:3004/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 0,
        })
      })
    }
  }

  return {
    type: 'RELEASE_CHECKED_TASK',
    payload: checkedTasks
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
export const getTasks = () => {
  const result = fetch('http://localhost:3004/tasks').then(res=> {
    return res.json()
  })
  return {
    type: 'GET_TASKS',
    payload: result,
  }
}

export const checkedTasks = (isChecked, id) => {
  return {
    type: 'CHECKED_TASKS',
    payload: { [id]: isChecked }
  }
}

export const updateDate = (id, newDate) => {
  const newDateToTimeStamp = new Date(newDate).getTime();
  fetch(`http://localhost:3004/tasks/${id}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      expiration_date: newDateToTimeStamp,
    })
  })
  return {
    type: 'UPDATE_DATE',
    payload: newDateToTimeStamp,
    id: id
  }
}

export const filterAndSort = (sortBy, filterBy, data) => { 
  const todaysDate = new Date().toISOString().split('T')[0]
  const todaysDateTimeStamp = new Date(todaysDate).getTime();
  let resultFilter = data.filter( element => { 
    if (filterBy === 'none'){
      return element;
    } else if (filterBy === 'released') {
      return element.status === 0
    } else if (filterBy === 'pending') {
      return element.status === 1
    } else if (filterBy === 'expired') {
      if(element.expiration_date < todaysDateTimeStamp && element.status === 1){
        return true
      }
    }
    return false
  })

  let result;
  
  if ( sortBy === 'expired' ) {
    result = resultFilter.sort((a, b) => {
      return  a.expiration_date - b.expiration_date
    });
  } else if ( sortBy === 'status' ) {
    let expiredResult = resultFilter.sort((a, b) => {
      return  a.expiration_date - b.expiration_date
    })
    result = expiredResult.sort((a, b) => {
      return b.status - a.status
    })
  } else if ( sortBy === 'created' ) {
    result = resultFilter.sort((a, b) => {
      return b.creation_date - a.creation_date
    })
  }

  return {
    type: 'RESULT_TASKS',
    payload: result
  }
}

export const sortTasks = (sortBy) => {
  return {
    type: 'SORT_TASKS',
    payload: sortBy
   }
}

export const filterTasks = (filterBy) => {
  return {
    type: 'FILTER_TASKS',
    payload: filterBy
   }
}

export const releaseCheckedTasks = ( checkedTasks ) => {
  const objectLength = Object.keys(checkedTasks).length;
  for( let i = 0; i < objectLength; i++) {
    const taskId = Object.keys(checkedTasks)[i];
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

export const addTask = (text, expirationDate) => {
  const expirationToTimeStamp = new Date(expirationDate).getTime();
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
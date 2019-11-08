export const getTasks = () => {
  const result = fetch('http://localhost:3004/tasks').then(res=> {
    return res.json()
  })
  return {
    type: 'GET_TASKS',
    payload: result
  }
}

export const addTask = (text,expiration_date) => {
  const expirationToTimeStamp = new Date(expiration_date).getTime();
  const creationDate = new Date().toISOString().split('T')[0];
  const creationDateToTimeStamp = new Date(creationDate).getTime();
  console.log(creationDate)
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
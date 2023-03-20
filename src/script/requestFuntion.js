export { getData, deleteData, postData, putData, checkLogin}

const token = "4a202cb9-e44c-4997-92e0-009ca6c50893";


async function getData() {
    let data = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}
          `}
    })
    data = await data.json();
    return data
}



function deleteData(id) {
    return fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
}

async function postData(visitObj) {
    let data = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(visitObj)
    })

    return data
}

async function putData(obj) {
  let data = await fetch(`https://ajax.test-danit.com/api/v2/cards/${obj.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(obj)
})
    return data;
}



async function checkLogin(username, passWord) {
  let data = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: `${username}`, password: `${passWord}` })
})
    let status = data.status
    return status
}
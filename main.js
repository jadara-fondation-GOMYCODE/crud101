// import database from "./db"
// const database = require('./db')

let addOrUpdateBtn = 'add'
let idSelectedUser

const database = [{ username: 'user001', password: 'asda132' }, { username: 'user002', password: 'asda132' }]

function Create() {
    const newuser = {
        username: document.getElementById('user').value,
        password: document.getElementById('password').value
    }
    if (addOrUpdateBtn == 'add') {
        database.push(newuser)
    }
    else {
        database[idSelectedUser] = newuser
        addOrUpdateBtn = 'add'
        document.getElementById('add').innerHTML = 'add'
    }
    Read()
}

function Read() {
    const red = document.getElementById("tbody")
    for (let i = 0; i < database.length; i++) {
        table = `<tr>
                <td>${database[i].username}</td>
                <td>${database[i].password}</td>
                <td><button onclick= "Update(${[i]})">update</button></td>
                <td><button>delete</button></td>
            </tr>`
    }
    red.innerHTML += table
}
Read()

function Update(i) {
    document.getElementById('user').value = database[i].username
    document.getElementById('password').value = database[i].password
    document.getElementById('add').innerHTML = 'Update';
    addOrUpdateBtn = 'Update'
    idSelectedUser = i;
    Read()
}

function Delete() {
    return (
        console.log("DELETE function")
    )
}

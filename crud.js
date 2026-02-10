const database = []
const username = document.getElementById('username')
const password = document.getElementById('password')

function clearInputs(){
    username.value = ''
    password.value = ''
}

function Create() {
    const newUser = {
        id : database.length ,
        username: username.value ,
        password : password.value
    }
    if(username.value && password.value){
        database.push(newUser)
        console.log(newUser);
    }else{
        alert('username and password values are required !')
    }
    clearInputs()
}

function Read(){
      
}
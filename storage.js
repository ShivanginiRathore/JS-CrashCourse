const userName = document.getElementById('name');
const email = document.getElementById('email');
// const userName = document.getElementById('name').value;
// console.log(userName)
const form = document.getElementById('my-form');
// static uniqueId = 0;
form.addEventListener('submit', storeAsObject);

function storeData(e){

    e.preventDefault();
    
    // console.log('UserName -> ' + userName)
    // console.log('text content -> ' + userName.textContent)
    
    localStorage.setItem(userName.value, email.value);
    userName.value = '';
    email.value = '';

}


// QUESTION 11
function storeAsObject(e){
    e.preventDefault();
    let ran = Math.floor(Math.random() * 100)
    let myObj={
        nameUser : userName.value,
        emailUser : email.value

    };
    let myObj_serialized = JSON.stringify(myObj);
    localStorage.setItem(`myObj${ran}`,myObj_serialized);
    userName.value = '';
    email.value = '';
}

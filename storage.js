const userName = document.getElementById('name');
const email = document.getElementById('email');
// const userName = document.getElementById('name').value;
// console.log(userName)
const form = document.getElementById('my-form');
form.addEventListener('submit', storeData);

function storeData(e){

    e.preventDefault();
    
    // console.log('UserName -> ' + userName)
    // console.log('text content -> ' + userName.textContent)
    
    localStorage.setItem(userName.value, email.value);
    userName.value = '';
    email.value = '';



}

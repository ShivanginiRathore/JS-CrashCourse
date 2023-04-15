const userName = document.getElementById('name');
const email = document.getElementById('email');
// const userName = document.getElementById('name').value;
// console.log(userName)
const form = document.getElementById('my-form');
const ul = document.getElementById('users');
// static uniqueId = 0;
form.addEventListener('submit', storeAsObject);
ul.addEventListener('click',removeItemFromUI);

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
    let nameUser = userName.value;
    let emailUser = email.value;
    // let ran = Math.floor(Math.random() * 100)
    let myObj={
        nameUser,
        emailUser
    };
    let myObj_serialized = JSON.stringify(myObj);
    const item = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.classList = 'Button';
    item.appendChild(document.createTextNode(nameUser + '-' + emailUser));
    item.appendChild(btn);
    ul.appendChild(item);

    localStorage.setItem(emailUser , myObj_serialized);
    userName.value = '';
    email.value = '';
}


function removeItemFromUI(e){
    e.preventDefault();
    // console.log(userName.value.type);
    // console.log(JSON.stringify(userName.value));

    if(e.target.classList.contains('Button')){
        let text = e.target.parentNode.firstChild.textContent;
        let mailId = text.split('-')[1];
        localStorage.removeItem(mailId);
        ul.removeChild(e.target.parentNode);
    }
}
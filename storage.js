const userName = document.getElementById('name');
const email = document.getElementById('email');
// const userName = document.getElementById('name').value;
// console.log(userName)
const form = document.getElementById('my-form');
const ul = document.getElementById('users');
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
    // create list element and two button
    const item = document.createElement('li');
    const btn = document.createElement('button');
    const editBtn = document.createElement('button');

    btn.textContent = 'Delete';
    btn.classList = 'button';

    editBtn.textContent = 'Edit';
    editBtn.classList = 'edit button';

    item.appendChild(document.createTextNode(nameUser + '-' + emailUser));
    item.appendChild(btn);
    item.appendChild(editBtn);
    ul.appendChild(item);

    localStorage.setItem(emailUser , myObj_serialized);
    userName.value = '';
    email.value = '';
}


function removeItemFromUI(e){
    e.preventDefault();

    if(e.target.classList.contains('button')){
        let text = e.target.parentNode.firstChild.textContent;
        let arrDetails = text.split('-');
        localStorage.removeItem(arrDetails[1]);
        
        // edit functionality
        if(e.target.classList.contains('edit')){
            userName.value = arrDetails[0];
            email.value = arrDetails[1];
        }
        ul.removeChild(e.target.parentNode);
    }
    
}
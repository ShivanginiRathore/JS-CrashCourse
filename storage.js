const userName = document.getElementById('name');
const email = document.getElementById('email');
// const userName = document.getElementById('name').value;
// console.log(userName)
const form = document.getElementById('my-form');
const ul = document.getElementById('users');
form.addEventListener('submit', storeAsObject);
ul.addEventListener('click',removeItemFromUI);

// to fetch the details from Network
function allStorage() {
    window.addEventListener("DOMContentLoaded", () => {
        axios.get("https://crudcrud.com/api/bef2f6a52423441aa70259abb9574616/appintmentData")
        .then(response =>{
            console.log(response);
            for (var i = 0; i<response.data.length; i++) {
                showDataOnUI(response.data[i]);
            }  
        })
        .catch(err=>{
            console.log(err);
        });
    })
    

}
allStorage();

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
    // Network call
    axios.post("https://crudcrud.com/api/bef2f6a52423441aa70259abb9574616/appintmentData",myObj)
    .then(data => {
        showDataOnUI(myObj);
        // console.log(data);
    })
    .catch(err=>{
        document.body.innerHTML = document.body.innerHTML + "Something went wrong";
        console.log(err)
    });
    // localStorage.setItem(emailUser , myObj_serialized);
    userName.value = '';
    email.value = '';
}

function showDataOnUI(obj){
    let visibleText = obj.nameUser + '-' + obj.emailUser;
    const item = document.createElement('li');
    const btn = document.createElement('button');
    const editBtn = document.createElement('button');

    btn.textContent = 'Delete';
    btn.classList = 'button';

    editBtn.textContent = 'Edit';
    editBtn.classList = 'edit button';

    item.appendChild(document.createTextNode(visibleText));
    item.appendChild(btn);
    item.appendChild(editBtn);
    ul.appendChild(item);

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
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
        axios.get("https://crudcrud.com/api/2db19c1936714b8aa64a194be9fd76e5/appintmentData")
        .then(response =>{
            // console.log(response);
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

    let myObj={
        nameUser,
        emailUser
    }
    
    // Network call
    axios.post("https://crudcrud.com/api/2db19c1936714b8aa64a194be9fd76e5/appintmentData",myObj)
    .then(data => {
        showDataOnUI(data.data);
    })
    .catch(err=>{
        document.body.innerHTML = document.body.innerHTML + "Something went wrong";
        console.log(err)
    });
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
    item.setAttribute('id',obj._id);

    
    item.appendChild(document.createTextNode(visibleText));
    item.appendChild(btn);
    item.appendChild(editBtn);
    // item.innerHTML = item.innerHTML + `<span style='visibility:hidden'>${obj._id}</span>`;
    // item.innerHTML = item.innerHTML + `<span style='visibility:hidden'>${obj}</span>`;
    ul.appendChild(item);
    

}


function removeItemFromUI(e){
    e.preventDefault();

    if(e.target.classList.contains('button')){
        let text = e.target.parentNode.id;        

        axios.delete(`https://crudcrud.com/api/2db19c1936714b8aa64a194be9fd76e5/appintmentData/${text}`)
        .then(mes => {
            // edit functionality
            if(e.target.classList.contains('edit')){
                let arrDetails = e.target.parentNode.firstChild.textContent.split('-');
                userName.value = arrDetails[0];
                email.value = arrDetails[1];
            }
            ul.removeChild(e.target.parentNode);
        })
        .catch(err => console.log((err)))     
    }
    
}
const form = document.getElementById('my-form');
form.addEventListener('submit', signUp);

async function signUp(e){
    try{
    e.preventDefault();

    let signUpDetails = {
        name : e.target.name.value,
        email : e.target.email.value,
        password : e.target.password.value
    }
    const response = await axios.post("/signup",signUpDetails)
    if(response.status === 201){
        document.body.innerHTML += `<div style="color:green;"> New user added successfully </div>`;
    }
    e.target.name.value = ""
    e.target.email.value = ""
    e.target.password.value = ""
    }
catch(err){
    document.body.innerHTML += `<div style="color:red;"> ${err} </div>`;
}}
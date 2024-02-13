const form = document.getElementById('my-form');
form.addEventListener('submit', login);

async function login(e){
    try{
    e.preventDefault();

    let loginDetails = {
        email : e.target.email.value,
        password : e.target.password.value
    }
    const response = await axios.post("/login",loginDetails)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', response)
    if(response.status === 200){
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>inside 200 status')
        document.body.innerHTML += `<div style="color:green;"> ${response.data.message} </div>`;
        // console.log(response.data);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('membership', response.data.membership)
        window.location.href = "../expense"
    } else {
        document.body.innerHTML += `<div style="color:red;"> ${response.data.message} </div>`;
    }
    e.target.name.value = ""
    e.target.email.value = ""
    e.target.password.value = ""
    }
catch(err){
    document.body.innerHTML += `<div style="color:red;"> ${err} </div>`;
}}

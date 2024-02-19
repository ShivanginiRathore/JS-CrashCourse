const form = document.getElementById('resetpass-form');
form.addEventListener('submit', resetPassword);

async function resetPassword(e){
    try{
        e.preventDefault();
        // const token = localStorage.getItem('token');

        const path = window.location.pathname;
        console.log(path.split);
        
        const parts = path.split('/');

// Get the last part (excluding any empty strings)
        const lastPart = parts.filter(part => part !== '').pop();

        console.log(lastPart);

        let passwordDetails = {
            password : e.target.password.value,
            uuid: lastPart
        }
        const response = await axios.post("/password/resetpassword",passwordDetails)
        if(response.status === 201){
            document.body.innerHTML += `<div style="color:green;"> password updated </div>`;
        }
    
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red;"> ${err} </div>`;
    }
}

    

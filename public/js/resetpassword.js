const form = document.getElementById('resetpass-form');
        form.addEventListener('submit', resetPassword);
  
        async function resetPassword(e){
            try{
                e.preventDefault();
                const token = localStorage.getItem('token');

                let passwordDetails = {
                    password : e.target.password.value,
                }
                const response = await axios.post("/password/resetpassword",passwordDetails,{headers: {"Authorization": token}})
                if(response.status === 201){
                    document.body.innerHTML += `<div style="color:green;"> password updated </div>`;
                }
            
            }
            catch(err){
                document.body.innerHTML += `<div style="color:red;"> ${err} </div>`;
            }
        }

    

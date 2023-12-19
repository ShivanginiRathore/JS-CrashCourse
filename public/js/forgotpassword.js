
        const form = document.getElementById('forgotpass-form');
        form.addEventListener('submit', sendEmail);
  
        async function sendEmail(e){
            try{
                e.preventDefault();
                const token = localStorage.getItem('token');

                let emailDetails = {
                    email : e.target.email.value,
                }
                const response = await axios.post("/password/forgotpassword",emailDetails,{headers: {"Authorization": token}})
                if(response.status === 201){
                    document.body.innerHTML += `<div style="color:green;"> Reset password link has been sent to your email ID </div>`;
                }
            
            }
            catch(err){
                document.body.innerHTML += `<div style="color:red;"> ${err} </div>`;
            }
        }

    

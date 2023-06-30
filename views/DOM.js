
        const form = document.getElementById('my-form');
        const userName = document.getElementById('name');
        const userEmail = document.getElementById('email');
        const userPhoneNumber = document.getElementById('phoneNumber');
        const ul = document.getElementById('users');

        function showDataOnUI(obj){
            let visibleText = obj.name + '-' + obj.email + '-' + obj.phoneNumber;
            // console.log(visibleText);
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
            ul.appendChild(item);
        }

        // to fetch all data from UI
        function allStorage() {
            window.addEventListener("DOMContentLoaded", async () => {
                const allUsers = await axios.get("http://localhost:3000/getUsers");
                allUsers.data.forEach(user => {
                    showDataOnUI(user);
                });
            })
        }
        allStorage();



        form.addEventListener('submit', storeAsObject);
        async function storeAsObject(e){
            e.preventDefault();
            // console.log('inside submit button');
            let name = userName.value;
            let email = userEmail.value;
            let phoneNumber = userPhoneNumber.value;

            let myObj={
                name,
                email,
                phoneNumber
            }
            // console.log('User details are----',myObj);
            const userDetails = await axios.post("http://localhost:3000/",myObj)
            console.log(userDetails);
            userName.value = '';
            userEmail.value = '';
            userPhoneNumber.value = '';
            await axios.get("http://localhost:3000/");
        }
    
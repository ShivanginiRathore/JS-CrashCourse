
// //      QUESTION 21
// // const ul = document.querySelector('.items');

// // ul.children[0].textContent = 'Hello';
// // ul.children[0].style.background = 'lightgreen';
// // ul.children[1].style.background = 'yellow';

// //      QUESTION 22 
// // const button = document.querySelector('.btn');
// // // const ul = document.querySelector('.items')
// // button.addEventListener('click',e =>{
// //     e.preventDefault();
// //     console.log('button clicked')
// //     // ul.children[0].style.background = 'lightgreen';
// // });

// // button.addEventListener('mouseover',e =>{
// //     e.preventDefault();
// //     console.log('Mouse over')
// //     // ul.children[0].style.background = 'green';
// // });

// // button.addEventListener('mouseout',e =>{
// //     e.preventDefault();
// //     console.log('Mouse out')
// //     // ul.children[0].style.background = 'none';
// // });


// const form = document.querySelector('#my-form');
// const userName = document.querySelector('#name');
// const email = document.querySelector('#email');
// const ul = document.querySelector('#users');
// const msg = document.querySelector('.msg');

// form.addEventListener('submit', onSubmit);

// function onSubmit(e){
//     e.preventDefault();
//     if(userName.value === '' || email.value === ''){
//         msg.textContent = 'Please enter all fields';
//         msg.style.color = 'red';
//         setTimeout(() => msg.remove(), 3000);
//     } else {
//         const li = document.createElement('li');
//         li.appendChild(document.createTextNode(`${userName.value} : ${email.value}`))

//         ul.appendChild(li);

//         // clear fields
//         userName.value = '';
//         email.value = '';
//     }
// }


console.log('Hello World')
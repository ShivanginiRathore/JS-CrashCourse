const token = localStorage.getItem('token');

const form = document.getElementById('expense-form');
const expenseAmount = document.getElementById('amount');
const expenseDesc = document.getElementById('description');
const expenseCategory = document.getElementById('category');
const ul = document.getElementById('expenses');
const ulLeaderboard = document.getElementById('listLeaderboard');
const ulFilesDownloaded = document.getElementById('filesDownloaded');
const pagination = document.getElementById('pagination');
const expenseList = document.getElementById('expenseList');

form.addEventListener('submit', storeAsObject);
ul.addEventListener('click',removeItemFromUI);
// dynamicPagination.addEventListener('select', dynamicPagination);


function showDataOnUI(obj){
    let visibleText = obj.amount + '-' + obj.description + '-' + obj.category;
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

function showfilesOnUI(fileObj){

    var a = document.createElement("a");
    var breakLine = document.createElement("br");

    var linkText = document.createTextNode(`File ${fileObj._id}`);
    a.appendChild(linkText);
    a.href = fileObj.url;
    a.download = 'myexpense.csv';
    ulFilesDownloaded.appendChild(a);
    ulFilesDownloaded.appendChild(breakLine);
}

function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage,
}) {
    pagination.innerHTML = '';

    if(hasPreviousPage){
        const btn2 = document.createElement('button')
        btn2.innerHTML = previousPage
        btn2.addEventListener('click', () => getProducts(previousPage))
        pagination.appendChild(btn2)
    }

    const btn1 = document.createElement('button')
    btn1.innerHTML = `<h3>${currentPage}</h3>`
    btn1.addEventListener('click', () => getProducts(currentPage))
    pagination.appendChild(btn1)

    if(hasNextPage) {
        console.log('inside next page btn',nextPage);
        const btn3 = document.createElement('button')
        btn3.innerHTML = nextPage
        btn3.addEventListener('click', () => getProducts(nextPage))
        pagination.appendChild(btn3)
    }
}

async function getProducts(page){
    const rows = document.getElementById("expenseList").value;
    const userExpenses = await axios.get(`/getExpenses?page=${page}&rows=${rows}`, {headers: {"Authorization": token}});
    ul.innerHTML = '';    
    userExpenses.data.expenses.forEach(expense => {
            showDataOnUI(expense);
        });

        showPagination(userExpenses.data);
}

function allStorage() {
    window.addEventListener("DOMContentLoaded", async () => {
        const token = localStorage.getItem('token');
        const membership = localStorage.getItem('membership');
        
        if(membership === 'true'){
            document.getElementById('buyPremium').style.display = "none";
            document.getElementById('premiumSection').style.display = "block";

            
        } else {
            document.getElementById('buyPremium').style.display = "block";
            document.getElementById('premiumSection').style.display = "none";

        }
        const page = 1;
        // const rows = document.getElementById("expenseList").value =;
        const rows = localStorage.getItem('pageSize')===null ?  document.getElementById("expenseList").value : localStorage.getItem('pageSize');
        expenseList.value = rows;
        // console.log(rows);

        const userExpenses = await axios.get(`/getExpenses?page=${page}&rows=${rows}`, {headers: {"Authorization": token}});
        userExpenses.data.expenses.forEach(expense => {
            showDataOnUI(expense);
        });
        showPagination(userExpenses.data);
        
        const filesDownloaded = await axios.get("/getDownloadedFiles", {headers: {"Authorization":token}});
        filesDownloaded.data.forEach(file => {
            // showfilesOnUI(file);
        })
    })
}
allStorage();

// async function dynamicPagination(){
//     const token = localStorage.getItem('token');
//     const page = 1;
//     const rows = document.getElementById("expenseList").value;
//     localStorage.setItem('pageSize',rows);
//     // console.log("in dynamic pagination rows are :", rows)

//     const userExpenses = await axios.get(`/getExpenses?page=${page}&rows=${rows}`, {headers: {"Authorization": token}});
//         userExpenses.data.expenses.forEach(expense => {
//             showDataOnUI(expense);
//         });
//         console.log(userExpenses.data)
//         showPagination(userExpenses.data);
// }

async function storeAsObject(e){
    e.preventDefault();
    let amount = expenseAmount.value;
    let description = expenseDesc.value;
    let category = expenseCategory.value;

    let myObj={
        amount,
        description,
        category
    }
    const token = localStorage.getItem('token');
    const expenses = await axios.post("/expense",myObj, {headers: {"Authorization": token}})
    // console.log(expenses.data.expense);
    showDataOnUI(expenses.data.expense);
    expenseAmount.value = '';
    expenseDesc.value = '';
    expenseCategory.value = '';
}

async function removeItemFromUI(e){
    e.preventDefault();

    if(e.target.classList.contains('button')){
        let id = e.target.parentNode.id;  
        const token = localStorage.getItem('token');
        await axios.delete(`/deleteExpense/${id}`,{headers: {"Authorization": token}})

        if(e.target.classList.contains('edit')){
            let arrDetails = e.target.parentNode.firstChild.textContent.split('-');
            console.log('Array details are >>>>>>>>>>>>>>> ',arrDetails)

            expenseAmount.value = arrDetails[0]
            expenseDesc.value = arrDetails[1]
            expenseCategory.value = arrDetails[2]
        } 
        ul.removeChild(e.target.parentNode);
    }
}

document.getElementById('buyPremium').onclick = async function(e){
    const response = await axios.get('/purchasePremium',{headers: {"Authorization": token}});
    console.log('response of payment>>>>>>>>>', response)
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order1.orderId,
        "handler": async function(response) {
            await axios.post('/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, {headers: {"Authorization": token}})

            alert('You are a Premium user');
            localStorage.setItem('membership','true');
            // document.getElementById('premiumLabel').style.display = "block";
            document.getElementById('premiumSection').style.display = "block";
            document.getElementById('buyPremium').style.display = "none";
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function(response){
        console.log(response)
        alert('Something went wrong')
    })
}

async function showDataOnLeaderboard(leaderboardData){

    let visibleText = `Name - ${leaderboardData.name} & Total expense - ${leaderboardData.totalAmount}`;
    const item = document.createElement('li');
    
    item.appendChild(document.createTextNode(visibleText));
    ulLeaderboard.appendChild(item);
}

document.getElementById('showLeaderboard').onclick = async function(e) {
    e.preventDefault();

    document.getElementById('leaderboardSection').style.display = "block";
    const response = await axios.post('/premiumLeaderboard');

    response.data.forEach(leaderboardData => {
            showDataOnLeaderboard(leaderboardData);
        });

}

async function download(){
    try{
        const response = await axios.get('/download', { headers: {"Authorization" : token} })
        console.log(response)
        if(response.status === 200){
            var a = document.createElement("a");
            a.href = response.data.fileList.url;
            a.download = 'myexpense.csv';
            a.click();
            showfilesOnUI(response.data.fileList);

        } else {
            throw new Error(response.data.message)
        }
    } catch(err) {
        // showError(err)
    }       
}


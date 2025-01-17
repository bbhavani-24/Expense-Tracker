const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//const dummyTransaction = [
  //{id: 1,text:'Flower',amount: -20},
 // {id: 2,text:'Book',amount: 300},
  //{id: 3,text:'Camera',amount: -1000},
 // {id: 4,text:'Salary',amount: 15000}
//];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')); 

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e)
{
  e.preventDefault();

  if(text.value.trim() === '' || amount.value.trim() === '')
  {
    alert("Please add a text or amount");
  }

  else
  {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

//GENERATE RANDOM ID
function generateID()
{
  return Math.floor(Math.random()*100000000);
}


//ADDING TRANSACTIONS TO DOM LIST
function addTransactionDOM(transaction)
{
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  //ADDING CLASS BASED ON VALUE
  item.classList.add(transaction.amount < 0 ? 'minus': 'plus');
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
  list.appendChild(item);
}

//UPDATING BALANCE INCOME AND EXPENSE
function updateValues()
{
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc,item)=> (acc+=item),0).toFixed(2);
  const income = amounts.
                        filter(item => item>0)
                        .reduce((acc,item) => (acc+=item),0)
                        .toFixed(2);

  const expense = (amounts.filter(item => item<0).reduce((acc,item) => (acc+=item),0) * -1).toFixed(2);
  
  balance.innerText = `₹${total}`;
  money_plus.innerText = `₹${income}`;
  money_minus.innerText = `₹${expense}`;
}

//REMOVE TRANSACTION
function removeTransaction(id)
{
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage()
{
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//INIT APP
function init()
{
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit',addTransaction)
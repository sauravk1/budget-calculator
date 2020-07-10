import React, { useState , useEffect} from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

// const initialExpense = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 2500 }
// ];
//expense conatins the array initialExpense and setexpenses contains function


//useEffect run after every render
//first parameter- callback function(run after render)
//second parameter-array-for letting react know when you run useEffect
const initialExpense=localStorage.getItem("expenses")?
JSON.parse(localStorage.getItem("expenses"))
:[];


function App() {
  //**************state values ********************
  //**************all expenses, add expenses ********************

  const [expenses, setExpenses] = useState(initialExpense);

  //****************single expense ****************
  const [charge, setCharge] = useState("");
  //****************single amount ****************
  const [amount, setAmount] = useState("");

  //edit
  const [edit, setEdit] = useState(false);

  //edit item
  const [id, setId] = useState(0);
  //**************alert********************
  const [alert, setAlert] = useState({ show: false });
  //**************useEffect ********************
  useEffect(()=>{
    console.log("use effect");
    
    localStorage.setItem("expenses",JSON.stringify(expenses));
  },[expenses]);

  //**************functionality ********************

  const handleCharge = e => {
    setCharge(e.target.value)
  }

  const handleAmount = e => {
    setAmount(e.target.value)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000)

  }
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type:"success",text:`${charge} edited successfully. `})
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added successfully." })
      }
      setCharge('');
      setAmount('');
    }
    else {
      handleAlert({
        type: "danger",
        text: "charge can't be empty value and amount should be bigger than 0"
      })

    }


  }
  //*******************clear items*****************
  const handleClear = (() => {
    setExpenses([]);
    handleAlert({type:"danger",text:"All items deleted successfully."})
  })

  //handle delete********************
  const handleDelete = (id, charge) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: `${charge} deleted` })


  }
  //handle edit****************
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    


  }



  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit} />
        <ExpenseList
          expenses={expenses}
          handleClear={handleClear}
          handleDelete={handleDelete}
          handleEdit={handleEdit} />
        <h1>total spending:<span className="total">
          &#8377;{" "}
          {/* rupee symbol  &#8377;*/}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span></h1>
      </main>
    </>
  );
}

export default App;

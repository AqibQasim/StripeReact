import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";

function App() {
  const[product,setproduct]= useState({
    name : "Api Automation Course",
    price : 10,
    productBy: "facebook"
  })
  const makePayment = token =>{
    const body = {
      token,
      product
    }
    const header = {
      "Content-Type":"application/json"
    }
    return fetch("http://localhost:3000/payment" ,{
      method : 'POST',
      headers : header,
      body : JSON.stringify(body)
    }).then(response =>{
      console.log("Response ", response);
      const {status} = response;
      console.log(status);
    })
    .catch(err =>{
      console.log(err)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout stripeKey='' token={makePayment} name='Buy Course' amount={product.price * 100}>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;

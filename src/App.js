/*useEffect fetch the API every time the applications is loaded.
the useState will take it will take the rates descriptions to populate the list of select options from the list.
*/
import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

/** the provided link have stored in JSON format all the latest currency conversions.
*/
const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {

  /**The useState hook and the purpose is to state for what the currency list is going to be.
   * this useState function returns an array of options, the first option is going to be what the
   * actual state is, the actual current iteration of the current state. The second value is going to be
   * the object or the function that allows to set the currency option. By default it will pass in an
   * empty array because there are no options when the app loads.
   */
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()//referent to the 1st input box
  const [toCurrency, setToCurrency] = useState()//referent to the 2nd input box
  const [exchangeRate, setExchangeRate] = useState()//makes the convertion with the proper exchange rate
  const [amount, setAmount] = useState(1)//define the default amount on the input box to 1

  //set the amount changed on the 1st box(from)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  //if the input selected come for the from amount if will executed, if it comes from to amount else will be executed
  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  /**the first parameter is a function and the second parameter is an array, and whenever the items in
   * that array change the useEffect will be reruned.
   * it will be only called once, in a empty array, since the empty array will never change
   * this useEffect wil only get called the first time the application loads.
   * the BASE_URL is fetched, then the fetch get back to convert the response to JSON, wich returns
   * another promise and this has the data.
   */
  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      /**setCurrencyOptions where the data is converted into an array of options.
       * the first value in the array will be the data, and the second value is going to be all of
       * those keys from the object in the rates part of the data.
       * ... will destructure the array
       */

      //it will get the key of the very 1st element
      const FirstCurrency = Object.keys(data.rates)[0]

      setCurrencyOptions([data.base, ...Object.keys(data.rates)])

      //it will get the currency from the provided API base
      setFromCurrency(data.base)
      setToCurrency(FirstCurrency)
      setExchangeRate(data.rates[FirstCurrency]) //the rate for currency
    })
  }, [])

  /*[fromCurrency or toCurrency] update the conversion as soon as currency changes withe function inside useEffect.
  the if statement solves the problem when the use effect has ben called when from and to currency where actually
  undefined*/
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  //for changes maded on from amount(first input box) seted as trues
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  //for changes maded on to amount(second input box) seted as false
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    /*the elements (h1 and the imported <CurrencyRow>) should be wrapped inside of fragments
    otherwise it won't render.
    */
    <>
      <h1>Convert</h1>

      <CurrencyRow
        /**currencyOptions will populate all the currency options in the CurrencyRow, passing the currency
         * optiokn as a prop(currencyOptions={currencyOptions})
         */
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}//it will pass in the selected currency
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
        />
      <div className="equals">=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
        />
    </>
  );
}

export default App;

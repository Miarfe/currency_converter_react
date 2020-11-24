import React from 'react'

/**the variable porps is a special keyword, which stands for properties, and is used for passing data from
 * one component to another in a uni-directional flow(one way from parent to child) in this case from
 * App.js in the CurrencyRow dropdown list to CurrencyRow.js to destructure that into object.
*/
export default function CurrencyRow(props) {

  const {
    currencyOptions,/**currencyOptions is the very first object to be destructed trough the props variable */
    selectedCurrency,
    onChangeCurrency, /**is where the function is pushed, then taked from the props. Ant time the 
    onChange the passed value onChangeCurrency it will be updated*/
    onChangeAmount,
    amount
  } = props

  /**once I have the above currencyOptions its possible to start loop through those inside of the select
   * this {currencyOptions.map( its going to translate the array of currencyOptions into actual options.
   * inside of the (option => function its return each one of the options, and the value for this options
   * is just going to be the option text.
   * as its presented a list of objects is necessary use key={option} that sets a unique value for each
   * one of the children.
   * 
   * the select value should be equal to the selectedCurrency.
   * 
   * to update the values any time a update happens its necessary to hook up on change event for each one
   * of the different currency selector.
  */
  return (
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

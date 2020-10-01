import React from 'react';
import CartContainer from './components/Cartcontainer';
import Navbar from './components/Nav';
import CartObj from './Cartitem';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  cart : CartObj,
  totalQuantity : 0,
  totalValue : 0
}
const reducer = (state = initialState, action) =>{

  if(action.type === 'INCREASE'){
    const tempCart = state.cart.map(item =>{
      if(item.id === action.payload.id){
        item.quantity = item.quantity + 1;
        return item;
      }
      return item
    })
    return {...state, cart : tempCart}
  }
  
  if(action.type === 'DECREASE'){
    const selectedItem = state.cart.filter(item => item.id === action.payload.id);
    if(selectedItem[0].quantity === 1){
      const tempCart = state.cart.filter(item => item.id !== action.payload.id);
        return {...state, cart : tempCart}
    }
    const tempCart = state.cart.map(item =>{
      if(item.id === action.payload.id){
        item.quantity = item.quantity - 1;
        return item;
      }
      return item
    })
    return {...state, cart : tempCart}
  }

  if(action.type === 'REMOVE'){
    const tempCart = state.cart.filter(item => item.id !== action.payload.id);
    return {...state, cart : tempCart}
  }

  if(action.type === 'CLEAR_CART'){
    return { ...state, cart : []}
  }
  if(action.type === 'TOTAL_QUALITY_&_AMOUNT'){
    const tQuality = state.cart.reduce((prev, curr)=>{
      prev += curr.quantity;
      return prev;
    }, 0);
    const tvalue = state.cart.reduce((prev,curr)=>{
      prev += curr.quantity * curr.price;
      return prev;
    },0)

    return {...state, totalQuantity : tQuality, totalValue : tvalue}
  }
  return state
}

const store = createStore(reducer, initialState);
function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar/>
        <CartContainer/>
      </div>
    </Provider>
  );
}

export default App;

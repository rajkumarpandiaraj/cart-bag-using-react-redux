import React,{useEffect} from "react";
import CartItem from "./Item";
import {connect} from 'react-redux';


const CartContainer = ({ cart = [], clearCart, total, totalValue }) => {
  useEffect(() => {
    total();
  },)
  if (cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <article>
        {cart.map(item => {
          return <CartItem key={item.id} {...item} />;
        })}
      </article>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${totalValue}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={clearCart}>clear cart</button>
      </footer>
    </section>
  );
};

const mapStateToProps = (state) =>{
  return {
    cart : state.cart,
    totalValue : state.totalValue
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    clearCart : ()=> dispatch({type : 'CLEAR_CART'}),
    total : () => dispatch({type : 'TOTAL_QUALITY_&_AMOUNT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
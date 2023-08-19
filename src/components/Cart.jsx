import { useEffect, useRef, useState } from "react";
import "./cart.css";
import { FaXmark, FaPlus, FaTrash } from "react-icons/fa6";
import { motion, useAnimate } from "framer-motion";
import { Link } from "react-router-dom";
import Rating from "./Rating";


const Cart = ({
  openCart,
  setOpenCart,
  cartItems,
  currPrice,
  removeFromCart,
  onIncrement,
  onDecrement,
  setIsRemoving,
  isRemoving,
  fadeOut,

}) => {
  

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].count;
    }
    return total;
  };
  
  return (
    <div className="cart">
      <div className="cart-header">
        <div className="your-cart">YOUR SHOPPING CART</div>
        <FaXmark onClick={() => setOpenCart(!openCart)} className="cross" />
      </div>
      {cartItems.length === 0 ? (
        <div className="is-empty">
          Your Shopping Cart is <br /> Empty!
          <div></div>
        </div>
      ) : (
        <div className="cart-wrapper">
          {isRemoving ? <div className="lds-facebook"><div></div><div></div><div></div></div> : <></>}

        <div  className={`${isRemoving ? "cart-items fade-out" : "cart-items"}`}>
          {cartItems.map((cartItem, i) => (
            <Link key={i} style={{textDecoration: 'none', color: 'inherit'}} to={`/products/${cartItem.id}`}>
            <div
            className='cart-item'
            key={i}
            onAnimationEnd={() => {
              if (isRemoving) {
                removeFromCart(cartItem)
              }}}
              >
              <img key={i} src={cartItem.image} alt="" className="cart-image" />
              <div key={i} className="cart-info-count-container">
                <div key={i} className="cart-title">{cartItem.title}</div>
                <div key={i} className="cart-counter">
                  <Link key={i} style={{color:'inherit', textDecoration: 'none'}}>
                  <div key={i}
                    onClick={() => {
                      setIsRemoving(true);
                      setTimeout(() => {
                        setIsRemoving(false);
                        onDecrement(cartItem);
                      }, 300);
                    }}
                    className="plus-minus"
                    >
                    -
                  </div>
                  </Link>
                  <div className="cart-count">{cartItem.count}</div>
                  <Link key={i} style={{color:'inherit', textDecoration: 'none'}}>
                  <div key={i}
                    onClick={() => {
                      setIsRemoving(true);
                      setTimeout(() => {
                        setIsRemoving(false);
                        onIncrement(cartItem);
                      }, 300);
                    }}
                    className="plus-minus"
                    >
                    +
                  </div>
                  </Link>
                </div>
              </div>
              <div key={i} className="cart-price">
                {currPrice(cartItem.price * cartItem.count)}
              </div>
              <Link key={i} style={{color:'inherit', textDecoration: 'none'}}>
              <FaTrash key={i}
                className="remove"
                onClick={() => {
                  setIsRemoving(true);
                  setTimeout(() => {
                    setIsRemoving(false);
                    removeFromCart(cartItem);
                  }, 300);
                }}
                />
                </Link>
            </div>
          </Link>
          ))}
        </div>
    
          <div className="total-order">
            <div className="sub-total">
              SubTotal:{" "}
              <div className="count">
                {currPrice(calculateTotal())}
              </div>
            </div>
            <a href="http://localhost:5000/checkout">
              <button className="checkout-btn">Proceed To Checkout</button>
            </a>
          </div>
      </div>
      )}
    </div>
  );
};

export default Cart;

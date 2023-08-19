import { useEffect } from "react";
import "./navbar.css";
import { useState } from "react";
import { FaShoppingCart, FaAngleDown } from "react-icons/fa";
import Cart from "./Cart";
import { Link } from "react-router-dom";



const Navbar = ({ currencies, setCurrency, currency, setOpenCart, openCart, cartItems}) => {
  const [openDropdown, setOpenDropDown] = useState(false);
  const [openCurDropdown, setOpenCurDropDown] = useState(false);
  
  const rotateArrow = () => {
    const arrow = document.querySelector('.arrow')
    arrow.classList.toggle('rotate')
  }

useEffect(()=> {
  const cart = document.querySelector(".cart");
  const overlay = document.querySelector('.overlay')
  const body = document.querySelector('body')
  
  openCart ? cart.style.width = '420px' : cart.style.width = '0'
  openCart ? overlay.style.backgroundColor = 'rgba(53, 53, 53, 0.455)' : overlay.style.backgroundColor = 'transparent'
  openCart ? overlay.style.display = 'block' : overlay.style.display = 'none'
  openCart ? body.style.overflowY = 'hidden' : body.style.overflowY = 'auto'
},)

const totalCount = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    count +=  arr[i].count;
  }
  if(count >= 99){
    return 99
  }
  else {
    return count
  }
} 
  



// Hover effect for dropdown menu
  useEffect(() => {
    
    const handleHover = () => {
      const dropdown = document.querySelector(".dropdown");
      const item = document.querySelectorAll(".dropdown-item");
      
      if (openDropdown) {
        dropdown.style.display = "block"
        dropdown.style.opacity = "100%";
        for (let i = 0; i < item.length; i++) {
          item[i].style.display = "block";
        }
      } else {
        dropdown.style.display = "none"
        dropdown.style.opacity = "0";
        for (let i = 0; i < item.length; i++) {
          item[i].style.display = "none";
        }
      }
    };
    handleHover();

  }, );

//function to toggle currency dropdown menu
  const handleClick = () => {
    setOpenCurDropDown(!openCurDropdown);
  };

  return (

    <div className="navbar">
      
      <div className="nav-items">
        <div className="nav-cats">
        <Link to='/' style={{textDecoration:'none', color:'black'}} className="nav-item">Home</Link>
        
          <Link to='/clothing' style={{textDecoration:'none', color:'black'}}
            onMouseOver={() => setOpenDropDown(true)}
            onMouseLeave={() => setOpenDropDown(false)}

            
            className="nav-item clothing"
          >
            Clothing
          </Link>
          <Link to='/electronics' style={{textDecoration:'none', color:'black'}} className="nav-item">Electronics</Link>
          <Link to='/jewelry' style={{textDecoration:'none', color:'black'}} className="nav-item">Jewelery</Link>
        </div>

        <div className="cur-cart-container">
          <div
            onClick={() => {
              handleClick();
              rotateArrow()
            }}
            className="nav-item currency-dropdown"
          >
            
            <div className="choose-currency">{currency}</div>
            <FaAngleDown className="arrow" />

        {/* mapping out currency array to display each currency   */}
            {openCurDropdown ? (
              <div className="cur-dropdown">
                {currencies.map((currency, i) => (
                  <div
                    className="currency"
                    key={i}
                    onClick={() => setCurrency(currency)}
                  >
                    {currency}
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="nav-item carts" onClick={()=>{
            setOpenCart(!openCart)
            }}>
            <FaShoppingCart  />
            {cartItems.length === 0 ? <></> : <div className="item-count">{totalCount(cartItems)}</div>}
          </div>
        </div>

      </div>
       
        


      <div onMouseLeave={() => setOpenDropDown(false) }  onMouseOver={() => setOpenDropDown(true)}className="dropdown">
        <div className="dropdown-items">
          <Link to='MensClothing' style={{textDecoration: 'none', color:'inherit'}} className="dropdown-item" href="">
            Mens Clothing
          </Link>
          <Link to='WomensClothing'style={{textDecoration: 'none', color:'inherit'}} className="dropdown-item" href="">
            Womens Clothing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

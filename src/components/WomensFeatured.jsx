import { useEffect, useRef, useLayoutEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MensFeatured.css";
import Card from "./Card";

const WomensFeatured = ({ womensClothing, currPrice,  addToCart, cartItems, loading}) => {
    
    
  
  
  
  //function to scroll element to the right
  const scrollRight = () => {
    const element = document.querySelector(".scrollable-wrapper");
    element.scrollLeft = element.scrollWidth - element.clientWidth;
    const circleOne = document.querySelector(".one");
    const circleTwo = document.querySelector(".two");
    circleOne.style.opacity = "0";
    circleTwo.style.opacity = "100";
  };
  //function to scroll element to the left
  const scrollLeft = () => {
    const circleOne = document.querySelector(".one");
    const circleTwo = document.querySelector(".two");
    circleTwo.style.opacity = "0";
    circleOne.style.opacity = "100";
    const element = document.querySelector(".scrollable-wrapper");
    element.scrollLeft = 0;
  };
  
 

    if (loading) {
      return (
        <div className="mens-featured">
          <h1 style={{ textAlign: "center" }}>Featured Women's Clothing</h1>
          <div className="scrollable-wrapper">
            <div id="menclothing1" className="featured-container">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
          <div className="circle-container">
            <div className="circle">
              <div className="activecircle one"></div>
            </div>
            <div className="circle">
              <div className="activecircle two"></div>
            </div>
          </div>
        </div>
      );
    }


  return (
    <div className="mens-featured">
      <h1 style={{ textAlign: "center" }}>Featured Women's Clothing</h1>
      <div  className="scrollable-wrapper">
        <div id="womenclothing1" className="featured-container">
          {womensClothing
            .filter((item, i) => i < 4)
            .map((item, i) => (
              <Link key={i} className='card'style={{textDecoration:'none', color:'black', objectFit:'cover', border:'none',}} to={`/products/${item.id}`}>
              <Card
              cartItems={cartItems}
              item={item}
              key={i}
              addToCart={addToCart}
              price={item.price}
              title={item.title}
              image={item.image}
              rating={item.rating.rate}
              currPrice={currPrice}
              />
              </Link>
            ))}
        </div>

        <div id="womenclothing2" className="featured-container">
          {womensClothing
            .filter((item, i) => i < 4)
            .map((item, i) => (
              <Link key={i} className='card'style={{textDecoration:'none', color:'black', objectFit:'cover', border:'none'}} to={`/products/${item.id}`}>
              <Card
              cartItems={cartItems}
              item={item}
              key={i}
              addToCart={addToCart}
              price={item.price}
              title={item.title}
              image={item.image}
              rating={item.rating.rate}
              currPrice={currPrice}
              />
              </Link>
            ))}
        </div>
      </div>
      <div className="circle-container">
        <div
          onClick={() => {
            scrollLeft();
          }}
          className="circle"
        >
          <div className="activecircle one"></div>
        </div>
        <div
          onClick={() => {
            scrollRight();
          }}
          className="circle"
        >
          <div className="activecircle two"></div>
        </div>
      </div>
    </div>
  );
};

export default WomensFeatured;

import { useEffect } from "react";
import "./MensFeatured.css";
import Card from "./Card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const MensFeatured = ({
  mensClothing,
  cartItems,
  currPrice,
  loading,
  addToCart,
}) => {
  //function to scroll element to the right
  const scrollRight = () => {
    const element = document.querySelector(".scrollable-wrapperm");
    element.scrollLeft = element.scrollWidth - element.clientWidth;
    const circleOne = document.querySelector(".onem");
    const circleTwo = document.querySelector(".twom");
    circleOne.style.opacity = "0";
    circleTwo.style.opacity = "100";
  };

  //function to scroll element to the left
  const scrollLeft = () => {
    const circleOne = document.querySelector(".onem");
    const circleTwo = document.querySelector(".twom");
    circleTwo.style.opacity = "0";
    circleOne.style.opacity = "100";
    const element = document.querySelector(".scrollable-wrapperm");
    element.scrollLeft = 0;
  };
  if (loading) {
    return (
      <div className="mens-featured">
        <h1 style={{ textAlign: "center" }}>Featured Men's Clothing</h1>
        <div className="scrollable-wrapperm">
          <div id="menclothing1" className="featured-container">
            <div className="lds-grid">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="circle-container">
          <div className="circle">
            <div className="activecirclem onem"></div>
          </div>
          <div className="circle">
            <div className="activecirclem twom"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      className="mens-featured"
    >
      <h1 style={{ textAlign: "center" }}>Featured Men's Clothing</h1>
      <div className="scrollable-wrapperm">
        <div id="menclothing1" className="featured-container">
          {mensClothing
            .filter((item, i) => i < 4)
            .map((item, i) => (
              <Link
                key={i}
                className="card"
                style={{
                  textDecoration: "none",
                  color: "black",
                  border: "none",
                  overflow: "visible",
                }}
                to={`/products/${item.id}`}
              >
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

        <div id="menclothing2" className="featured-container">
          {mensClothing
            .filter((item, i) => i < 4)
            .map((item, i) => (
              <Link
                key={i}
                className="card"
                style={{
                  textDecoration: "none",
                  color: "black",
                  border: "none",
                  overflow: "visible",
                }}
                to={`/products/${item.id}`}
              >
                <Card
                  cartItems={cartItems}
                  item={item}
                  addToCart={addToCart}
                  key={i}
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
          <div className="activecirclem onem"></div>
        </div>
        <div
          onClick={() => {
            scrollRight();
          }}
          className="circle"
        >
          <div className="activecirclem twom"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default MensFeatured;

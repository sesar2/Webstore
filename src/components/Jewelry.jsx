import { useState, useEffect } from "react";
import "./jewelry.css";
import Card from "./Card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './MensFeatured.css'

const Jewelry = ({
  cartItems,
  addToCart,
  currPrice, 
}) => {
  const [jewelery, setjewelery] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/jewelery`
      );
      const jsonData = await res.json();
      setjewelery(jsonData);
      setLoading(false)
    };
    fetchData();
  }, []);
  if(loading) {
    return(
        <div className="jewelery">
        <div className="sidebar">
        </div>
        <div
          className="cards-container">
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
    )
  }




  return (
    <div className="jewelery">
      <div className="sidebar">
      <p style={{opacity: '50%', margin: '100px'}}>Filter function coming soon...</p>
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="cards-container"
      >
        {jewelery.map((item, i) => (
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
      </motion.div>
    </div>
  );
};

export default Jewelry;

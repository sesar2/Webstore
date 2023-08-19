import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { FaAngleDown, FaShoppingCart } from "react-icons/fa";
import Rating from "./Rating";
import { motion } from "framer-motion";

const ProductDetails = ({ currPrice, addToCart }) => {
  const [product, setProduct] = useState([]);
  const [openDesc, setOpenDesc] = useState(true);
  const [loading, setLoading] = useState(true)
  const { id } = useParams();


 

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const jsonData = await res.json();
      setProduct([jsonData]);
      setLoading(false)
    };
    fetchData();
  }, []);
  const rotateArrow = () => {
    const arrow = document.querySelector(".arw");
    arrow.classList.toggle("active");
  };

  

if(loading){
  return(
    <div className="product-details-container">
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
  )
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
    className="product-details-container">

      {product.map((product, i) => (
        <div key={i} className="product-details-wrapper">
          <img key={i} className="product-image" src={product.image} />
          <div key={i} className="product-info-container">
            <div key={i} className="name">
              {product.title}
            </div>
            <div key={i} className="price">
              {currPrice(product.price)}
            </div>
            <div key={i} className="rating">
            <Rating value={product.rating.rate}/>
            <div className="reviews">{product.rating.count} Reviews</div>
            </div>
            <div className="line"></div>
            <button
              onClick={() => addToCart(product)}
              key={i}
              className="add-to-cart"
            >
              Add to cart <FaShoppingCart />
            </button>
            <p>Usually delivers between 3 to 5 business days</p>
            <div className="line"></div>
            <div
              className="desc-btn"
              onClick={() => {
                setOpenDesc(!openDesc);
                rotateArrow();
              }}
              key={i}
            >
              <h3>Description</h3>
              <FaAngleDown className="arw" />
            </div>
            <div key={i} className="description">
              {openDesc ? product.description : <></>}
            </div>
            <div className="line"></div>

          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default ProductDetails;

import { FaShoppingCart } from "react-icons/fa";
import "./card.css";
import { useEffect } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";


const Card = ({price, rating, image, currPrice, title, addToCart, item, cartItems}) => {



    return(
        <div  className="card">
              <img className="item-image" src={image} alt="" />
              <div className="card-wrapper">
                <div className="card-info-container">
                  <div className="item-name">
                    {title}
                    <div className="item-rating">
                       <Rating value={rating}/>
                    </div>
                  </div>
                  <div className="item-price">
                    {currPrice(price)}
                    <Link>
                    <div onClick={()=> addToCart(item)} className="addtocard">
                      <FaShoppingCart /> Add To Cart
                    </div>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
    )
}

export default Card
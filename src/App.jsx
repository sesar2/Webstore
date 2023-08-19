import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeaderImage from "./components/HeaderImage";
import MensFeatured from "./components/MensFeatured";
import WomensFeatured from "./components/WomensFeatured";
import Cart from "./components/Cart";
import Klarna from "./components/Klarna";
import ProductDetails from "./components/ProductDetails";
import Jewelry from "./components/Jewelry";
import Clothing from "./components/Clothing";
import Electronics from "./components/Electronics";
import MensClothing from "./components/MensClothing";
import WomensClothing from './components/WomensClothing'
import env from "react-dotenv";
import NotFound from './components/NotFound'


import { Route, Routes } from "react-router-dom";

function App() {
  const currencies = ["USD", "SEK", "GBP", "EUR"];
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("none");
  const [openCart, setOpenCart] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [mensClothing, setMensClothing] = useState([]);
  const [womensClothing, setWomensClothing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  console.log(cartItems);

  useEffect(() => {
    // Save cart items to local storage whenever the cartItems state changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //Function to increment the count of each individual product in the cart
  const handleIncrement = (product) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === product.id) {
        return { ...cartItem, count: cartItem.count + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);
  };

  //Function to decrement the count of each individual product in the cart
  const handleDecrement = (product) => {
    const updatedCartItems = cartItems
      .map((cartItem) => {
        if (cartItem.id === product.id) {
          const updatedCount = cartItem.count - 1;
          if (updatedCount <= 0) {
            // If count reaches 0 or goes negative, remove the item from cart
            return null;
          }
          return { ...cartItem, count: updatedCount };
        }
        return cartItem;
      })
      .filter(Boolean); // Filter out any null items from the array

    setCartItems(updatedCartItems);
  };

  //funtion to add a product to the cart
  const addToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].count += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, newProduct]);
    }
  };

  //funtion to remove a product to the cart
  const removeFromCart = (product) => {
    setCartItems((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  //Function to change currency of the products

  const currPrice = (price) => {
    if (currency === "SEK") {
      return <div>{Math.round((price * 10.86) / 10) * 10} kr</div>;
    } else if (currency === "GBP") {
      return <div>{Math.round(price * 0.77 * 10) / 10} £</div>;
    } else if (currency === "EUR") {
      return <div>{Math.round(price * 0.9 * 10) / 10} €</div>;
    } else {
      return <div>{Math.round(price * 10) / 10} $</div>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/men's clothing`
      );
      const jsonData = await res.json();
      setMensClothing(jsonData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const [klarna, setKlarna] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/checkout");
      const jsonData = await res.json();
      setKlarna(jsonData);
    };
    fetchData();
  }, []);

  console.log(klarna);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/women's clothing`
      );
      const jsonData = await res.json();
      setWomensClothing(jsonData);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <Navbar
        cartItems={cartItems}
        currency={currency}
        setCurrency={setCurrency}
        currencies={currencies}
        openCart={openCart}
        setOpenCart={setOpenCart}
      />

      <Cart
        onDecrement={handleDecrement}
        isRemoving={isRemoving}
        setIsRemoving={setIsRemoving}
        onIncrement={handleIncrement}
        removeFromCart={removeFromCart}
        currPrice={currPrice}
        openCart={openCart}
        setOpenCart={setOpenCart}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <div onClick={() => setOpenCart(false)} className="overlay"></div>
      <Routes>
        <Route path="/checkout" element={<Klarna />} />
        <Route
          path="/products/:id"
          element={
            <ProductDetails currPrice={currPrice} addToCart={addToCart} />
          }
        />

        <Route
          path="/jewelry"
          element={
            <Jewelry
              cartItems={cartItems}
              addToCart={addToCart}
              loading={loading}
              mensClothing={mensClothing}
              currency={currency}
              currPrice={currPrice}
            />
          }
        />
        <Route
          path="/MensClothing"
          element={
            <MensClothing
              cartItems={cartItems}
              addToCart={addToCart}
              loading={loading}
              mensClothing={mensClothing}
              currency={currency}
              currPrice={currPrice}
            />
          }
        />
        <Route
          path="/WomensClothing"
          element={
            <WomensClothing
              cartItems={cartItems}
              addToCart={addToCart}
              loading={loading}
              womensClothing={womensClothing}
              currency={currency}
              currPrice={currPrice}
            />
          }
        />
        <Route
          path="/electronics"
          element={
            <Electronics
              cartItems={cartItems}
              addToCart={addToCart}
              loading={loading}
              mensClothing={mensClothing}
              currency={currency}
              currPrice={currPrice}
            />
          }
        />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/clothing"
          element={
            <Clothing
              cartItems={cartItems}
              addToCart={addToCart}
              loading={loading}
              mensClothing={mensClothing}
              womensClothing={womensClothing}
              currPrice={currPrice}
            />
          }
        />
        <Route
          path="/"
          element={
            <main>
              <HeaderImage />
              <section id="1">
                <MensFeatured
                  cartItems={cartItems}
                  addToCart={addToCart}
                  loading={loading}
                  mensClothing={mensClothing}
                  currency={currency}
                  currPrice={currPrice}
                />
              </section>
              <WomensFeatured
                cartItems={cartItems}
                addToCart={addToCart}
                loading={loading}
                womensClothing={womensClothing}
                currency={currency}
                currPrice={currPrice}
              />
            </main>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

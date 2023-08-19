// server/server.js
import express from "express";
import cors from "cors";
import { createOrder, getKlarnaAuth, retrieveOrder } from "./klarna.js";
import { config } from "dotenv";
const app = express();
const port = process.env.VITE_REACT_APP_PORT || 5000;
config();

app.use(cors());

app.get("/checkout", async (req, res) => {
  const cartItems = [
    { name: "handske", price: 200, count: 2 },
    { name: "aaaaa", price: 350, count: 6 },
    { name: "aaaaa", price: 500, count: 1 },
    { name: "aaa", price: 700, count: 6 },
  ];
  try {
    const klarnaResponse = await createOrder(cartItems);
    const markup = klarnaResponse.html_snippet;
    res.send(markup);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/confirmation", async (req, res) => {
  const { order_id } = req.query;
  const klarnaResponse = await retrieveOrder(order_id);
  const markup = klarnaResponse.html_snippet;
  res.send(markup);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

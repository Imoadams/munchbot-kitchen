const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let orders = [];
let orderId = 1;

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  const { item, notes } = req.body;

  const newOrder = {
    id: orderId++,
    item,
    notes,
    status: "pending",
    time: new Date().toLocaleTimeString()
  };

  orders.push(newOrder);
  res.json(newOrder);
});

app.post("/api/orders/:id/done", (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);

  if (order) {
    order.status = "done";
  }

  res.json(order);
});

app.listen(PORT, () => {
  console.log("Kitchen running on port " + PORT);
});

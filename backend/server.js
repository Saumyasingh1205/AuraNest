import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// STATIC FILES
// ----------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------------
// PRODUCTS
// ----------------------
const productsPath = path.join(__dirname, "data", "products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

app.get("/api/products", (req, res) => {
  res.json(products);
});

// ----------------------
// USERS (AUTH)
// ----------------------
const usersPath = path.join(__dirname, "users.json");

const readUsers = () => {
  if (!fs.existsSync(usersPath)) return [];
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
};

const writeUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

// REGISTER
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const users = readUsers();

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

// LOGIN
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name, // ✅ FIXES "Hi, User"
      email: user.email,
    },
  });
});

// ----------------------
// ORDERS
// ----------------------
const ordersPath = path.join(__dirname, "orders.json");

const readOrders = () => {
  if (!fs.existsSync(ordersPath)) return [];
  return JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
};

const writeOrders = (orders) => {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
};

// PLACE ORDER
app.post("/api/orders", (req, res) => {
  const { userId, items, address, phone, total } = req.body;

  if (!userId || !items || items.length === 0 || !address || !phone || !total) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const orders = readOrders();

  const newOrder = {
    id: Date.now(),
    userId,
    items,
    address,
    phone,
    total,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  writeOrders(orders);

  res.status(201).json(newOrder); // ✅ IMPORTANT
});

// GET ORDER HISTORY (USER)
app.get("/api/orders/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const orders = readOrders();
  const userOrders = orders.filter((o) => o.userId === userId);
  res.json(userOrders);
});

// ----------------------
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


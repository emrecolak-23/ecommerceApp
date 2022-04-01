// Import Packages
const express = require("express");
const cors = require("cors");
// Declare express app
const app = express();


// Import Routes
const ProductRoutes = require("./routes/ProductRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const UserRoutes = require("./routes/UserRoutes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("uploads"));

// Routers
app.use('/api/product', ProductRoutes);
app.use('/api/category', CategoryRoutes);
app.use('/api/user',UserRoutes)
// PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server created`);
})
const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
var cors = require("cors");
const webpush = require("web-push");

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static("public"));

// Initialize DB
require("./initDB")();

const HomeRoute = require("./routes/homeRoutes");
app.use("/home", HomeRoute);

const RegisterRoute = require("./routes/registerRoutes");
app.use("/register", RegisterRoute);

const LoginRoute = require("./routes/loginRoutes");
app.use("/login", LoginRoute);

const SupplierRoute = require("./routes/supplierRoutes");
app.use("/supplier", SupplierRoute);

const ProductRoute = require("./routes/productRoutes");
app.use("/prod", ProductRoute);

const PublishRoute = require('./routes/publishRoutes');
app.use('/publish',PublishRoute);

const BadgeRoute = require("./routes/badgeRoutes");
app.use("/badge", BadgeRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
  // You can use the above code if your not using the http-errors module
  next(createError(404, "Not found"));
});

//route check for the brand-dashboard-backend
app.get('/routecheck', (req,res)=> {
  res.send("Brand-dashboard-backend is working properly");
})

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});

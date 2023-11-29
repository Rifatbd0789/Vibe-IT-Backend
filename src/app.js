const express = require("express");
const app = express();
const servicesRoute = require("./Routes/ServiceCollection/Services");
const allUserPutMethod = require("./Routes/UserCollection/PutMethod");
const postUser = require("./Routes/UserCollection/PostUser");
const allUserGetMethod = require("./Routes/UserCollection/GetMethod");
const postMethodPayment = require("./Routes/PaymentCollection/PostPayment");
const allGetPayment = require("./Routes/PaymentCollection/PaymentGetMethod");
const postMethodWordData = require("./Routes/WorksCollection/PostMethod");
const WorkGetMethod = require("./Routes/WorksCollection/WorkGetMethod");
const stripePayment = require("./Routes/StripePayment");
const applyMiddleWare = require("./Middlewares");
const ErrorHandler = require("./utils/ErrorHandler");

applyMiddleWare(app);

app.use(servicesRoute);
app.use(allUserPutMethod);
app.use(allUserGetMethod);
app.use(postUser);
app.use(stripePayment);
app.use(postMethodPayment);
app.use(allGetPayment);
app.use(postMethodWordData);
app.use(WorkGetMethod);

app.get("/", (req, res) => {
  res.send("Vibe-It server is running");
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(
    `There has nothing called ${req.originalUrl} on the server`
  );
  error.status = 404;
  next(error);
});

// error handler
app.use(ErrorHandler);

module.exports = app;

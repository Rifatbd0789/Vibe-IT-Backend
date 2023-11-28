const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pkfg2gw.mongodb.net/?retryWrites=true&w=majority`;
// Create a Mongoose client
mongoose.connect(uri, {
  dbName: process.env.DB_NAME,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const UserSchema = new Schema({
  email: { type: String },
  name: { type: String },
  role: { type: String },
  designation: { type: String },
  salary: { type: String },
  bank: { type: String },
  photo: { type: String },
  Verified: { type: String },
  fire: { type: String },
});
const PaymentSchema = new Schema({
  name: { type: String },
  photo: { type: String },
  designation: { type: String },
  email: { type: String },
  salary: { type: String },
  transectionId: { type: String },
  time: { type: String },
  status: { type: String },
});
const WorkSchema = new Schema({
  name: { type: String },
  email: { type: String },
  date: { type: String },
  hour: { type: String },
  task: { type: String },
  timeStamp: { type: String },
});
const ServiceSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
});
async function run() {
  try {
    const userCollection = model("users", UserSchema);
    const paymentCollection = model("payments", PaymentSchema);
    const worksCollection = model("works", WorkSchema);
    const serviceCollection = model("services", ServiceSchema);

    // load services for homepage
    app.get("/services", async (req, res) => {
      const result = await serviceCollection.find().exec();
      res.send(result);
    });
    // load all user info to ui for admin
    app.get("/users", async (req, res) => {
      const roleToMatch = ["Employee", "HR"];
      const filter = { role: { $in: roleToMatch }, Verified: true };
      const result = await userCollection.find(filter).exec();
      res.send(result);
    });
    // make employee to HR
    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const updateDoc = {
        $set: {
          role: "HR",
        },
      };
      const result = await userCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    // Fire an user as admin
    app.put("/users/fire/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const updateDoc = {
        $set: {
          fire: true,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    // load all employee for hr
    app.get("/employee", async (req, res) => {
      const filter = { role: "Employee" };
      const result = await userCollection.find(filter).exec();
      res.send(result);
    });
    // check for HR, admin and employee
    app.get("/users/hr/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user?.role === "Admin") {
        res.send({ user: "Admin" });
      }
      if (user?.role === "HR") {
        res.send({ user: "HR" });
      }
      if (user?.role === "Employee") {
        res.send({ user: "Employee" });
      }
    });
    // verify the employee
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const user = await userCollection.findOne(filter);
      const newValue = !user?.Verified;
      const updateDoc = {
        $set: {
          Verified: newValue,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // post all the users info to database
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.create(user);
      res.send(result);
    });
    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { salary } = req.body;
      const amount = parseInt(salary);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });
    // save payment info to database
    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.create(payment);
      res.send(paymentResult);
    });
    // data to show on chart
    app.get("/dashboard/details/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new mongoose.Types.ObjectId(id) };
      const result = await userCollection.findOne(filter);
      const email = result.email;
      const query = { email: email };

      const result2 = await paymentCollection
        .find(query, { time: 1, salary: 1 })
        .exec();
      res.send(result2);
    });
    // load specific user
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new mongoose.Types.ObjectId(id) };
      const result = await userCollection.findOne(filter);
      res.send(result);
    });
    // check the user fire or not when login
    app.get("/users/login/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await userCollection.findOne(filter);
      res.send(result);
    });
    // show payments data to web
    app.get("/payments/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };

      const result = await paymentCollection
        .find(query)
        .sort({ time: -1 })
        .exec();
      res.send(result);
    });
    // post or store the worksheet data to database
    app.post("/worksheet", async (req, res) => {
      const sheet = req.body;
      const result = await worksCollection.create(sheet);
      res.send(result);
    });
    // show data to the web for employee
    app.get("/worksheet/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };

      const result = await worksCollection
        .find(query)
        .sort({ timeStamp: -1 })
        .exec();
      res.send(result);
    });
    // show all workData for HR
    app.get("/progress/p", async (req, res) => {
      const name = req.query.name;
      let query = {};
      if (name === "search") {
        const result = await worksCollection.find().exec();
        res.send(result);
        return;
      }
      query = { name: name };
      const result = await worksCollection.find(query).exec();
      res.send(result);
    });
    // to get the name of every employee
    app.get("/progress/name", async (req, res) => {
      const filter = { role: "Employee" };
      const result = await userCollection.find(filter, { name: 1 }).exec();
      res.send(result);
    });
    // Send a ping to confirm a successful connection

    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB");
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Vibe-It server is running");
});
app.listen(port, () => {
  console.log(`Vibe-It is running on ${port}`);
});

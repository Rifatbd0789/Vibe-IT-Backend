const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pkfg2gw.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const database = client.db("Vibe-IT-DB");
    const userCollection = database.collection("users");
    const paymentCollection = database.collection("payments");
    const chartCollection = database.collection("charts");
    // load all user info to ui
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    // check for HR, admin and employee
    app.get("/users/hr/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user?.role === "admin") {
        res.send({ user: "admin" });
      }
      if (user?.role === "HR") {
        res.send({ user: "hr" });
      }
      if (user?.role === "Employee") {
        res.send({ user: "employee" });
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
      const result = await userCollection.insertOne(user);
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
      const paymentResult = await paymentCollection.insertOne(payment);
      res.send(paymentResult);
    });
    // data to show on chart
    app.get("/dashboard/details/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const option = {
        projection: { _id: 0, time: 1, salary: 1 },
      };
      const result = await paymentCollection.find(query, option).toArray();
      res.send(result);
    });
    // load specific user
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await userCollection.findOne(filter);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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

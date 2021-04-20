const express = require("express");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");
const objectId = require("mongodb").ObjectId;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ixxx.mongodb.net/elecMan?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

client.connect((err) => {
  const serviceCollection = client.db("elecMan").collection("service");
  const reviewCollection = client.db("elecMan").collection("reviews");
  const orderCollection = client.db("elecMan").collection("orders");
  const userCollection = client.db("elecMan").collection("users");

  app.post("/addService", (req, res) => {
    const service = req.body;
    serviceCollection.insertOne(service).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/addUser", (req, res) => {
    const user = req.body;
    userCollection.insertOne(user).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/addOrder", (req, res) => {
    const order = req.body;
    orderCollection.insertOne(order).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/addReview", (req, res) => {
    const review = req.body;
    reviewCollection.insertOne(review).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/book/:id", (req, res) => {
    serviceCollection
      .find({ _id: objectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  app.get("/service/:id", (req, res) => {
    serviceCollection
      .find({ _id: objectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  app.get("/services", (req, res) => {
    serviceCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.get("/reviews", (req, res) => {
    reviewCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/orders", (req, res) => {
    orderCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/users", (req, res) => {
    userCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/userOrders", (req, res) => {
    orderCollection
      .find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.delete("/delete/:id", (req, res) => {
    serviceCollection
      .findOneAndDelete({ _id: objectId(req.params.id) })
      .then((result) => {
        console.log(result);
        res.send(result.deletedCount > 0);
      });
  });

  app.patch("/update/:id", (req, res) => {
    collection
      .updateOne(
        { _id: objectId(req.params.id) },
        {
          $set: { pName: req.body.name, description: req.body.description },
        }
      )
      .then((result) => {
        res.send(result.modifiedCount > 0);
      });
  });
});

app.get("/", (req, res) => {
    console.log('electrical ultra online');
  res.send("Hi, Electrical Ultra ");
});

app.listen(port);

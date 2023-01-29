const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

// const products = require('./Data/data.json');

const uri = process.env.MONGOBD_URL;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("moonTech");
    const productCollection = db.collection("product");

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();
      res.send(product);
      console.log(product);
      // res.send({ status: true, data: product });
    });

    app.post("/product", async (req, res) => {
      const product = req.body;

      const result = await productCollection.insertOne(product);

      res.send(result);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productCollection.deleteOne({_id:ObjectId(id)});
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send(`moon tech server is running on ${port}`);
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

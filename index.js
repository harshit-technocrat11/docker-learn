import express from "express";
import path from "path";
import { MongoClient } from "mongodb";

const app = express();
const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //express backend serves static files now

const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
const client = new MongoClient(MONGO_URL);

app.get("/", async (req, res)=>{
    res.json({msg:"Hello from localhost "})
})

// get all users

app.get("/getUsers", async (_req, res) => {
  await client.connect(MONGO_URL);

  console.log("connected succesfully");

  const db = client.db("harshit-docker-learn");
  const data = await db.collection("users").find({}).toArray();
  console.log(data);

  client.close();
  res.send(data);
});

//POST new user
app.post("/addUser", async (req, res) => {
  const userObj = req.body;
  console.log(req.body);
  await client.connect(MONGO_URL);
  console.log("Connected successfully to server");

  const db = client.db("harshit-docker-learn");
  const result = await db.collection("users").insertOne(userObj);
  console.log(result);
  console.log("data inserted in DB");
  client.close();

  res.status(201).json({ success: true, insertedId: result.insertedId });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT} `);
});

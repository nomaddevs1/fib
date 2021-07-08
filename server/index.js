const keys = require("./key");

//Express App Setup
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("dev"));

//DATABASE
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
  connectionTimeoutMillis: 3000,
});

(async function () {
  try {
    const client = await pgClient.connect();
    client.query("CREATE TABLE IF NOT EXISTS values (number INT)");
  } catch (err) {
    console.log(err);
  }
})();

//CACHING
const redis = require("redis");
const util = require("util");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

//Routes handlers
app.get("/", (req, res) => {
  res.send("Hello There");
});

app.get("/values/all", async (req, res) => {
  try {
    const values = await pgClient.query("SELECT * from values");
    res.send(values.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;
  console.log(index);
  if (index > 40) {
    return res.status(422).send("Index too High");
  }
  console.log(redisClient);
  redisClient.hset("values", index, "Nothing yet");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO values(number)  VALUES($1)", [index]);
  res.send({ working: true });
});

app.listen(5000, () => {
  console.log("Listening");
});

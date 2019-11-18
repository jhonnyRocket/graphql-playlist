const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
require('dotenv').config()

const app = express();

// connect to mongodb

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('Connected to mongodb');
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => console.log('Server is listening on port 4000...'));
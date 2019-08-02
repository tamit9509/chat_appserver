const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/db.js');
const app = express();
require('./models/User');
const routes = require('./routes');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(routes);

app.listen(config.port, () => {
  console.log(`server started at 3000 port`);
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});
mongoose.connection.once('open', (err) => {
  if (err) {
    console.error('DB error=====>>>', err);
    return;
  }
  console.log("database connection open success");
})
const express = require("express");
// const router = express.Router()
const { getCovid19MyCases } = require("./scrapper")

const app = express();
const port = 9000

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get('/', async (req, res) => {
  res.send(await getCovid19MyCases())
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
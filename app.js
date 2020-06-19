const express = require("express");
const { outbreakMyScrapper } = require("./scrapper")

const app = express();
const port = process.env.PORT || 9000

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get('/outbreak-scrapper', async (req, res) => {
  res.send(await outbreakMyScrapper(req, res))
})
app.get('/', async (req, res) => {
  res.send('/outbreak-scrapper')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
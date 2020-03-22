const express = require("express");
// const router = express.Router()
const { getCovid19MyCases } = require("./scrapper")

const app = express();
const port = 9000

app.get('/', async (req, res) => {
  res.send(await getCovid19MyCases())
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
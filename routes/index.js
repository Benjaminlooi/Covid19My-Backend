const express = require('express')
const apiRouter = express.Router();

const {
  outbreakMyScrapper
} = require('../controllers/scrapperController')

apiRouter.get('/outbreak-scrapper', async (req, res) => {
  res.send(await outbreakMyScrapper(req, res))
})

module.exports = apiRouter
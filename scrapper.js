const axios = require("axios");
const cheerio = require("cheerio")

const fetchHtml = async url => {
  try {
    const { data } = await axios.get(url)
    console.log(data)
    return data
  } catch {
    console.error(`ERROR: An error occured when trying to fetch the URL: ${url}`)
  }
}

const scrapper = async () => {
  const url = "https://newslab.malaysiakini.com/covid-19/en";

  const html = await fetchHtml(url)
  // console.log("scrapSteam -> html", html)

  const $ = cheerio.load(html)
  // console.log("scrapSteam -> selector", selector)

  const result = $("body").find('#confirm-case-count')

  // console.log(result.text())
}

scrapper()
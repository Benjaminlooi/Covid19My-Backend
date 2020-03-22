const puppeteer = require('puppeteer');

const getCovid19MyCases = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('https://newslab.malaysiakini.com/covid-19/en');

  await page.waitForSelector('.legend-total');
  const data = await page.evaluate(() => {
    const dataConfirmed = document.querySelector('.legend-total').textContent;
    const dataInTreatment = document.querySelector('.legend-treatment').textContent;
    const dataDischarged = document.querySelector('.legend-discharged').textContent;
    const dataDeaths = document.querySelector('.legend-dead').textContent;

    return {
      dataConfirmed,
      dataInTreatment,
      dataDischarged,
      dataDeaths
    }
  })
  // console.log("data", data)

  await browser.close();

  return data;
};

module.exports = { getCovid19MyCases }
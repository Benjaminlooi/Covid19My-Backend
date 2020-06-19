const puppeteer = require('puppeteer');
const { db } = require('../plugins/firebase')

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


const outbreakMyScrapper = async (req, res) => {
  console.log('Running outbreakMyScrapper...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://www.outbreak.my/');

  await page.waitFor(() => {
    const count = document.querySelector('#cases-my-confirmed');
    return count && count.innerText !== '-';
  });
  // await page.waitFor(async() => {
  //   const count = document.querySelector('#cases-my-confirmed');
  //   let firstCount = count.innerText;
  //   let secondCount = count.innerText;
  //   return firstCount == secondCount;
  // });
  await page.waitFor(5000)

  let data = await page.evaluate(() => {
    const dataConfirmed = document.querySelector('#cases-my-confirmed').textContent;
    const dataConfirmedChanges = document.querySelector('#cases-my-confirmed-changes').textContent;
    const dataInTreatment = document.querySelector('#cases-my-active').textContent;
    const dataInTreatmentChanges = document.querySelector('#cases-my-active-changes').textContent;
    const dataRecovered = document.querySelector('#cases-my-recovered').textContent;
    const dataRecoveredChanges = document.querySelector('#cases-my-recovered-changes').textContent;
    const dataDeaths = document.querySelector('#cases-my-death').textContent;
    const dataDeathsChanges = document.querySelector('#cases-my-death-changes').textContent;

    // const malaysiaMapImgSrc = document.querySelector('#cases-my-death').textContent;

    return {
      dataConfirmed,
      dataConfirmedChanges,
      dataInTreatment,
      dataInTreatmentChanges,
      dataRecovered,
      dataRecoveredChanges,
      dataDeaths,
      dataDeathsChanges
    }
  })
  data.updatedTime = new Date();
  // console.log("data", data)

  // page.$x('/html/body/div[1]/div[1]/div[3]/div/div[4]/div[1]/div/div[2]/div/div[2]/div[1]/div/div/a/img')
  const [elementHandle] = await page.$x('/html/body/div[1]/div[1]/div[3]/div/div[4]/div[1]/div/div[2]/div/div[2]/div[1]/div/div/a/img');
  const propertyHandle = await elementHandle.getProperty('src');
  const propertyValue = await propertyHandle.jsonValue();
  data.malaysiaMapSrc = propertyValue;
  console.log("outbreakMyScrapper -> data", data)

  await browser.close();

  let colRef = db.collection('outbreakmy');

  colRef.add(data)
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id)
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  // res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
  res.status(200).send(data)
  console.log('outbreakMyScrapper ended...');
}

module.exports = { getCovid19MyCases, outbreakMyScrapper }


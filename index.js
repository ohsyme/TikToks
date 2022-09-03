const puppeteer = require('puppeteer-extra')
const cheerio = require('cheerio')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Qs = require("qs");
puppeteer.use(StealthPlugin())

let cookies = [{'url': 'https://zefoy.com',"name":"PHPSESSID","value":"sg34jhi7scm33pl9133jnsfrl4"}]
async function scrape(baseUrl){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58')
  await page.setCookie(...cookies)
  await page.goto(baseUrl, {waitUntil: "networkidle2"});
  await page.waitForTimeout(5000)
  await page.waitForSelector('div > div > div:nth-child(4) > div > button', { timeout: 5000 })
  await page.click('div > div > div:nth-child(4) > div > button');
  await browser.close();
  return data
}

scrape('https://zefoy.com')
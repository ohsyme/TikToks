  const puppeteer = require('puppeteer-extra')
  const cheerio = require('cheerio')
  const StealthPlugin = require('puppeteer-extra-plugin-stealth');
  const fs = require('fs')
  const tesseract = require("node-tesseract-ocr")
  const puppeteer = require('puppeteer-extra')
  puppeteer.use(StealthPlugin())


  let LINKTIKTOK = "https://www.tiktok.com/@ohsyme/video/7139217961918795035?is_from_webapp=1&sender_device=pc&web_id=7129868894336697857"
  let cookies = [{'url': 'https://zefoy.com',"name":"PHPSESSID","value":"sg34jhi7scm33pl9133jnsfrl4"}]
  async function scrape(baseUrl){
    console.log("opening browser")
    const browser = await puppeteer.launch({headless:false,args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58')
    await page.setCookie(...cookies)
    await page.goto(baseUrl, {waitUntil: "networkidle2"});
    await page.screenshot({ path: 'response.png', fullPage: true })
    await page.waitForXPath('/html/body/div[4]/div[1]/div[3]/div/div[4]/div/button');
    let el = await page.$x('/html/body/div[4]/div[1]/div[3]/div/div[4]/div/button')
    el[0].click()

    await delay(500);
    await page.waitForXPath('/html/body/div[4]/div[5]/div/form/div/input');
    
    await page.waitForSelector('html > body div:nth-child(5) > div > form > div > input')
    await page.focus('html > body div:nth-child(5) > div > form > div > input')
    await page.keyboard.type(LINKTIKTOK)
    console.log("typing link")
    await delay(600);

    // /html/body/div[4]/div[5]/div/form/div/div/button
    // /html/body/div[4]/div[5]/div/div/div[1]/div/form/button
    await page.waitForXPath("/html/body/div[4]/div[5]/div/form/div/div/button")
    let elButton = await page.$x('/html/body/div[4]/div[5]/div/form/div/div/button')
    elButton[0].click()

    try {
      await page.waitForXPath("/html/body/div[4]/div[5]/div/div/div[1]/div/form/button", {timeout: 3000})
      let elButton2 = await page.$x('/html/body/div[4]/div[5]/div/div/div[1]/div/form/button')
      elButton2[0].click()
      console.log("Sended 1K viewers")
      console.log("Waiting for 2 Minute to cooldown")

      await delay(2*60*1000+3000)
      scrape(baseUrl)
    } catch {
      console.log("CoolDown")

      await page.waitForSelector("h4")
      let element = await page.$('h4')
      let value = await page.evaluate(el => el.textContent, element)
      await delay(2)
      let minutes = parseInt(value.split(" ")[2])
      let seconds = parseInt(value.split(" ")[4])

      let time_to_wait = (minutes * 60 + seconds)
      console.log("Waiting => ", time_to_wait, 'seconds')
      await delay(time_to_wait)
      scrape(baseUrl)
    }
    await browser.close();
  }
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

function get_proxy(){
  let readfiletxt = fs.readFileSync('./Proxies.txt', "utf-8")
  let split = readfiletxt.split('\n')
  let random1 = split[Math.floor(Math.random()*split.length)];
  return random1
}

  const puppeteer = require('puppeteer-extra')
  const cheerio = require('cheerio')
  const StealthPlugin = require('puppeteer-extra-plugin-stealth');
  const Qs = require("qs");
  puppeteer.use(StealthPlugin())

  let LINKTIKTOK = ""
  let cookies = [{'url': 'https://zefoy.com',"name":"PHPSESSID","value":"sg34jhi7scm33pl9133jnsfrl4"}]
  async function scrape(baseUrl,Link){
    const browser = await puppeteer.launch({headless:false,args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58')
    await page.setCookie(...cookies)
    await page.goto(baseUrl, {waitUntil: "networkidle2"});
    await page.waitForTimeout(5000)
    await page.waitForXPath('/html/body/div[4]/div[1]/div[3]/div/div[4]/div/button');
    let el = await page.$x('/html/body/div[4]/div[1]/div[3]/div/div[4]/div/button')
    el[0].click()

    await page.waitForXPath('/html/body/div[4]/div[5]/div/form/div/input');

        // evaluate XPath expression of the target selector (it return array of ElementHandle)
        let elHandle = await page.$x('/html/body/div[4]/div[5]/div/form/div/input');
        // prepare to get the textContent of the selector above (use page.evaluate)
        let  = await page.evaluate(el => el.value = Link,elHandle);
    

  }

  scrape('https://zefoy.com',LINKTIKTOK)
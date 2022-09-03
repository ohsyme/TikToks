import fetch from "node-fetch"
import fs from "fs"
import URLParse from "url-parse";
import HttpsProxyAgent from "https-proxy-agent";
import json from "./list.json" assert { type: "json" };
import UA from "./ua.json" assert {type:"json"}

async function test(){
    let platform      = json.Platform.random()
    let osVersion     = randomIntFromInterval(1, 12)
    let DeviceType    = json.Devices.random()
    let headers       = {
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "user-agent": UA.UA.random()
                    }
    let appName       = ["tiktok_web", "musically_go"].random
    let Device_ID     = randomIntFromInterval(1000000000000000000, 9999999999999999999)
    let apiDomain     = json.Domain.random()
    let channelLol    = json.Channel.random()
    let itemID = UrlParse('https://www.tiktok.com/@mau_apaan/video/7139062231605595419?is_from_webapp=1&sender_device=pc&web_id=7129868894336697857')
    let URI           = `https://${apiDomain}/aweme/v1/aweme/stats/?channel=${channelLol}&device_type=${DeviceType}&device_id=${Device_ID}&os_version=${osVersion}&version_code=220400&app_name=${appName}&device_platform=${platform}&aid=1988&`
    let data          = `item_id=${itemID}&play_delta=1`

        const proxyAgent = new HttpsProxyAgent(get_proxy());
        const res = await fetch(URI+data, {method: 'POST', headers:headers})
        console.log((await res.text()))
        return true
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

async function UrlParse(url) {
    let base_url = url
    if (base_url.includes('vt.tiktok.com') || base_url.includes('vm.tiktok.com')){
        let url = await fetch(base_url, { method: 'POST', body: 'a=1'})
        let get_redirect = new URLParse(url.url)
        return get_redirect.pathname.split("/")[3]
    } else {
    var url = new URLParse(base_url)
    return url.pathname.split("/")[3]
    }
}

async function get_proxy(){
    let readfiletxt = fs.readFileSync('./Proxies.txt', "utf-8")
    let split = readfiletxt.split('\n')
    return split.random

}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  test()
const fs = require('fs')
const puppeteer =require("puppeteer");
const TelegramBot = require("node-telegram-bot-api")
const conf = JSON.parse(fs.readFileSync('conf.json'));
const { linkSearcher } = require("./searcher.js")

const tokenBot=conf.telegramKey;
const bot = new TelegramBot(tokenBot,{polling:true})


bot.on("message",async (msg)=>{
    let result = false
    const chatId = msg.chat.id;
    const text = msg.text;
    const splitText = text.split(" ")
    if(text.includes("/help")){
        result=true
        bot.sendMessage(chatId,"to look up any term write /search TERM \n TERM is the word you want to look up")
    }
    if(splitText[0]==="/search" && splitText.length>=2 && !result){
        result=true
        let request = splitText.splice(1).toString();
        let link = 'https://duckduckgo.com/?t=h_&q=_REQUEST_'
        link = link.replace("_REQUEST_",request)
        link = link.replace(","," ")
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link);
        let content = await page.content();
        let addresses = linkSearcher(content.replaceAll("\"",""),request);
        console.log(addresses)
        await browser.close();
        //bot.sendMessage(chatId,content.slice(0,4000))
    }

    if(!result){
        bot.sendMessage(chatId,"Unknown command, use /help to learn how to use this bot")
    }
})
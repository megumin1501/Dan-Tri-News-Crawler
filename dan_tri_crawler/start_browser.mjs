import puppeteer from 'puppeteer';
/* 
if using puppeteer-core
import puppeteer from 'puppeteer-core'; 
*/

async function open_browser(url = 'https://example.com/') {

    const browser = await puppeteer.launch({headless: true});

    // using your browser
    // const browser = await puppeteer.launch({
    //     executablePath:
    //         'C:/Program Files/CocCoc/Browser/Application/browser.exe',
    //     headless: true,
    // });

    const page = await browser.newPage();
    await page.goto(url);
    return { page: page, browser: browser };
}

export default open_browser;

import open_browser from './start_browser.mjs';
import get_aritcle_content from './crawl_article.mjs';

async function get_breaking_news() {
    const { page, browser } = await open_browser('https://dantri.com.vn/');
    const CSS_selector_highlight_section = 'body > main > div.grid.highlight';
    let highlight_section;
    try {
        highlight_section = await page.waitForSelector(
            CSS_selector_highlight_section,
            { timeout: 3000 },
        );
    } catch {
        console.log('highlight article section is not exits in this page');
        highlight_section = null;
    }

    let thumb_list;
    highlight_section == null || highlight_section == undefined
        ? (thumb_list = [])
        : (thumb_list = await highlight_section.$$('.article-thumb'));

    const crawl_list = [];
    for (let i = 0; i < thumb_list.length; i++) {
        try {
            let temp_page = await browser.newPage();
            let link_selector = await thumb_list[i].$eval('a', (thumb) =>
                thumb.getAttribute('href'),
            );
            let link = 'https://dantri.com.vn/' + link_selector;
            console.log('CRAWLING POST : ' + link);
            await temp_page.goto(link, {
                timeout: 10000,
                waitUntil: 'domcontentloaded',
            });
            let article_content = await get_aritcle_content(temp_page, link);
            await temp_page.close();
            crawl_list.push(article_content);
        } catch {
            console.log('temp page crashed');
        }
    }
    // console.log(crawl_list);
    const crawlable_articles = crawl_list.filter(
        (article) => article != null && article != undefined,
    );
    browser.close(); // close browser
    return crawlable_articles;
}
export default get_breaking_news;

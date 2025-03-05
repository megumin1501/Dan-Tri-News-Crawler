import open_browser from './start_browser.mjs';
import { line_decorator } from '../helper/decorator.mjs';
import get_aritcle_content from './crawl_article.mjs';
import get_photo_story_aritcle_content from './crawl_photo_story_article.mjs';
import checkIsPhotoStory from './check_is_photo_story.mjs';

const BASE_URL = 'https://dantri.com.vn/';

async function get_category_news(url = 'https://dantri.com.vn/the-thao.htm') {
    const { page, browser } = await open_browser(url);
    console.log('CRAWL AT :' + url);
    line_decorator();

    const thumb_list = await get_thumb_list(page);
    const crawl_list = [];

    for (let i = 0; i < thumb_list.length; i++) {
        try {
            let temp_page = await browser.newPage();
            let link_selector = await thumb_list[i].$eval('a', (thumb) =>
                thumb.getAttribute('href'),
            );
            let link = BASE_URL + link_selector;
            console.log('CRAWLING POST : ' + link);
            await temp_page.goto(link, {
                timeout: 10000,
                waitUntil: 'domcontentloaded',
            });
            let article 
            let isPhotoStory = await checkIsPhotoStory(temp_page)
            if (isPhotoStory){
                article = await get_photo_story_aritcle_content(temp_page,link)
            }
            else{
                article = await get_aritcle_content(temp_page, link);
            }
            await temp_page.close();
            crawl_list.push(article);
        } catch {
            console.log('temp page crashed');
        }
    }
    console.log('\n Finished crawling page');
    line_decorator()

    const { crawlable_articles, crawl_metadata } = filter_after_crawled(
        crawl_list,
        thumb_list,
        url,
    );
    console.log(crawl_metadata);
    console.log(crawl_list);
    browser.close();
    return { crawlable_articles, crawl_metadata };
}

async function get_thumb_list(page) {
    const CSS_selector_article_highlight =
        'body > main > div.grid.highlight > div.article-wrap';
    const CSS_selector_article_list = '#bai-viet > div.main > div.article.list';

    let highlight_section;
    try {
        highlight_section = await page.waitForSelector(
            CSS_selector_article_highlight,
            { timeout: 3000 },
        );
    } catch {
        console.log('highlight article section is not exits in this page');
        highlight_section = null;
    }

    let list_section;
    try {
        list_section = await page.waitForSelector(CSS_selector_article_list, {
            timeout: 3000,
        });
    } catch {
        console.log('article list section is not exits in this page');
        list_section = null;
    }

    let thumb_list1;
    highlight_section == null || highlight_section == undefined
        ? (thumb_list1 = [])
        : (thumb_list1 = await highlight_section.$$('.article-thumb'));

    let thumb_list2;
    list_section == null || list_section == undefined
        ? (thumb_list2 = [])
        : (thumb_list2 = await list_section.$$('.article-thumb'));

    const thumb_list = [...thumb_list1, ...thumb_list2];
    return thumb_list;
}

function filter_after_crawled(crawl_list, thumb_list, url) {
    const crawl_metadata = {
        url: url,
        articles_to_crawl: 0,
        crawlable_articles: 0,
        uncrawlable_articles: 0,
    };

    const crawlable_articles = crawl_list.filter(
        (article) => article != null && article != undefined,
    );

    crawl_metadata.articles_to_crawl = thumb_list.length;
    crawl_metadata.crawlable_articles = crawlable_articles.length;
    crawl_metadata.uncrawlable_articles =
        thumb_list.length - crawlable_articles.length;

    return { crawlable_articles, crawl_metadata };
}

async function test_crawl_specific_article(
    url = 'https://dantri.com.vn/the-thao/chelsea-tra-gia-dat-sau-man-xo-xat-o-tran-dau-voi-nottingham-forest-20241007094713879.htm',
    browser,
) {
    try {
        const { browser } = await open_browser();
        let temp_page = await browser.newPage();
        await temp_page.goto(url, {
            timeout: 10000,
            waitUntil: 'domcontentloaded',
        });
        let article_fetch = await get_aritcle_content(temp_page);
        await temp_page.close();
        console.log(article_fetch);
    } catch {
        console.log('runtime error');
    }
}

async function test_crawl_specific_article2(
    url = 'https://dantri.com.vn/xa-hoi/giao-thong-khac-biet-sau-1-tuan-dong-nga-tu-ngat-den-do-o-duong-8-lan-xe-20250305014745301.htm',
    browser,
) {
    try {
        const { browser } = await open_browser();
        let temp_page = await browser.newPage();
        await temp_page.goto(url, {
            timeout: 10000,
            waitUntil: 'domcontentloaded',
        });
        let fetch = await checkIsPhotoStory(temp_page);
        await temp_page.close();
        console.log(fetch);
    } catch {
        console.log('runtime error');
    }
}
// get_sport_news()
export default get_category_news;

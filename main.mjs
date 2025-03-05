import { write_dan_tri_news_json } from './helper/handle_json.mjs';
import { ascii_welcome_text } from './helper/decorator.mjs';
import {
    crawl_news_category,
    crawl_breaking_news,
    crawl_all_category,
} from './helper/crawl_options.mjs';
import helper_argumnets from './helper/arguments_handle.mjs';

function main() {
    // no options argument
    if (process.argv.length == 2) {
        // need to call functon
        crawl_news('trang-chu')
    }
    // handle option arguments
    if (process.argv[2] == '-crawl') {
        let limit_page = 1;
        let category_name = process.argv[3].slice(1);
        if (process.argv.length == 5) limit_page = process.argv[4].slice(1);

        return crawl_news(category_name, limit_page);
    } else if (process.argv[2] == '-crawlurl') {
        console.log(process.argv[3]);
        return crawl_news_with_url(process.argv[3]);
    } else return false;
}

async function crawl_news(category_name = '', limit_page = 1) {
    ascii_welcome_text();
    const option = helper_argumnets(category_name, limit_page);
    switch (option) {
        case 'all':
            return await crawl_all_category();
        case 'breaking_news':
            return await crawl_breaking_news('tin-nong');
        case 'category_news_one_page':
            return await crawl_news_category(category_name, 1);
        case 'category_news_multiple_pages':
            return await crawl_news_category(category_name, limit_page);
        default:
            return null;
    }
}

async function crawl_news_with_url(url) {
    const res = await write_dan_tri_news_json(url);
    return res;
}

main();

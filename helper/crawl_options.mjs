import { write_dan_tri_news_json } from './handle_json.mjs';
import { line_decorator } from './decorator.mjs';

const BASE_URL = 'https://dantri.com.vn/';
const CATEGORY_LIST = [
    'xa-hoi',
    'the-gioi',
    'kinh-doanh',
    'bat-dong-san',
    'the-thao',
    'lao-dong-viec-lam',
    'suc-khoe',
    'van-hoa',
    'giai-tri',
    'suc-manh-so',
    'giao-duc',
    'an-sinh',
    'phap-luat',
];

async function crawl_news_category(category_name = '', limit_page = 1) {
    const res = [];
    let check;
    let url = BASE_URL + category_name + '.htm';
    check = await write_dan_tri_news_json(url, category_name);
    res.push(check);

    for (let index_page = 2; index_page <= limit_page; index_page++) {
        url = BASE_URL + category_name + '/trang-' + index_page + '.htm';
        let check = await write_dan_tri_news_json(url, category_name);
        res.push(check);
    }
    console.log('CRAWL COMPLETE')
    line_decorator()
    line_decorator()
    return res;
}

async function crawl_breaking_news(category_name) {
    let check = await write_dan_tri_news_json(BASE_URL, category_name, true);
    return check;
}

async function crawl_all_category() {
    const res = [];
    for (let category of CATEGORY_LIST) {
        let check = await crawl_news_category(category, 30);
        res.push(check);
    }
    return res;
}

export { crawl_news_category, crawl_breaking_news, crawl_all_category };

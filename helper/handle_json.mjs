import * as fs from 'node:fs';
import get_category_news from '../dan_tri_crawler/crawl_category_news.mjs';
import get_breaking_news from '../dan_tri_crawler/crawl_breaking_news.mjs';

function init_json_structure() {
    let dan_tri_crawled_obj = {
        date: '',
        time: '',
        category: '',
        list_of_articles: null,
    };
    return dan_tri_crawled_obj;
}

async function write_dan_tri_news_json(
    url = '',
    category_name = '',
    is_breaking_news = false,
) {
    let crawlable_articles = null;
    if (is_breaking_news) {
        crawlable_articles = await get_breaking_news();
    } else {
        ({ crawlable_articles } = await get_category_news(url));
    }
    const dan_tri_crawled_obj = create_json_obj(
        crawlable_articles,
        category_name,
    );
    const { date } = get_current_time();
    const file_name = 'created_' + date;
    const path = './resources/dan_tri_news/' + file_name + '.json';

    if (fs.existsSync(path)) {
        const data_json = fs.readFileSync(path, 'utf8');
        const list_json_obj = JSON.parse(data_json);
        list_json_obj.push(dan_tri_crawled_obj);
        try {
            fs.writeFileSync(path, JSON.stringify(list_json_obj), 'utf8');
            return true;
        } catch {
            return false;
        }
    } else {
        const wrapper_list = [dan_tri_crawled_obj];
        try {
            fs.writeFileSync(path, JSON.stringify(wrapper_list), 'utf8');
            return true;
        } catch {
            return false;
        }
    }
}

function create_json_obj(crawlable_articles, category_name) {
    const { date, time } = get_current_time();
    const dan_tri_crawled_obj = init_json_structure();
    dan_tri_crawled_obj.list_of_articles = crawlable_articles;
    dan_tri_crawled_obj.date = date;
    dan_tri_crawled_obj.time = time;
    dan_tri_crawled_obj.category = category_name;
    return dan_tri_crawled_obj;
}

function write_obj(article, obj_json) {
    const list = obj_json.list_of_articles;
    list.push(article);
}

function get_current_time() {
    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + +d.getFullYear();
    let time = d.getHours() + '-' + d.getMinutes() + '-' + +d.getSeconds();
    return { date, time };
}
export { write_dan_tri_news_json };
// write_dan_tri_news_json()
// get_current_time()

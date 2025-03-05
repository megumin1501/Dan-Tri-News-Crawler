async function get_photo_story_aritcle_content(page, link) {
    const article_value = {
        title: '',
        time: '',
        overview: '',
        content: '',
    };
    const xpath_title =
        '::-p-xpath(/html/body/main/article/div[2]/h1)';
    const xpath_time =
        '::-p-xpath(/html/body/main/article/div[2]/div/time)';
    const xpath_overview =
        '::-p-xpath(/html/body/main/article/h2)';
    const xpath_content =
        '::-p-xpath( /html/body/main/article/div[3])';

    try {
        const article_title = await page.waitForSelector(xpath_title, {
            timeout: 1000,
        });
        const article_time = await page.waitForSelector(xpath_time, {
            timeout: 1000,
        });
        const article_overview = await page.waitForSelector(xpath_overview, {
            timeout: 1000,
        });
        const article_content = await page.waitForSelector(xpath_content, {
            timeout: 1000,
        });

        article_value.title = await page.evaluate((article_title) => {
            return article_title.textContent;
        }, article_title);
        article_value.time = await page.evaluate((article_time) => {
            return article_time.textContent;
        }, article_time);
        article_value.overview = await page.evaluate((article_overview) => {
            return article_overview.textContent;
        }, article_overview);
        article_value.content = await page.evaluate((article_content) => {
            return article_content.textContent;
        }, article_content);

        const article_obj = {};
        article_obj[link] = article_value;
        return article_obj;
    } catch {
        console.log('cannot crawl in this article');
        return null;
    }
}

export default get_photo_story_aritcle_content;

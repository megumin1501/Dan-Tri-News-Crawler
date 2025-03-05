async function checkIsPhotoStory(page, link){
    let label;
    const xpathPhotoStory = '::-p-xpath(/html/body/header/div/div[2]/a)';
    try {
        const PhotoStory = await page.waitForSelector(xpathPhotoStory, {
            timeout: 1000,
        });

        label = await page.evaluate((PhotoStory) => {
            return PhotoStory.href;
        }, PhotoStory);
        if (label =='https://dantri.com.vn/photo-story.htm')
            return true
        else return false
    } catch {
        return false;
    }
}

export default checkIsPhotoStory;

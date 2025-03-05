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

function helper_argumnets(category_name, limit_page) {
    if (category_name === 'all') return 'all';
    if (
        !category_name ||
        category_name === 'tin-nong' ||
        category_name === 'trang-chu'
    )
        return 'breaking_news';
    if (CATEGORY_LIST.includes(category_name)) {
        if (limit_page == 1) return 'category_news_one_page';
        else if (limit_page >= 2 && limit_page <= 30)
            return 'category_news_multiple_pages';
        else return null;
    }
    return null;
}

export default helper_argumnets;

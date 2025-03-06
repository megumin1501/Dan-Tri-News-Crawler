
# Dan Tri news crawler 

A CLI tool built with Puppeteer and embedded a headless browser to crawl content from Dan Tri News (Báo Dân Trí)
## About the project

Crawl news from Dan Tri with options :
+ Crawl breaking news (Trang Chủ)
+ Crawl category news like Kinh Doanh, Xã Hội, Thể Thao,..
+ Crawl all news as much as possilbe
The crawled news is stored in */resources/dan_tri_news*

## Run the project 
### Prerequisites 
Ensure you have : 
+ node
+ npm  
### Clone and Install
To run the project in CLI

    git clone https://github.com/megumin1501/Dan-Tri-News-Crawler.git
    cd Dan-Tri-News-Crawler
    npm install



##  Usage
Ensure that commands is run in the root folder

### Crawl breaking news (Trang chủ)

    node main.mjs -crawl -trang-chu
or using npm command
    
    npm start

### Crawl category news
Categories in Dan Tri News: [ 'xa-hoi', 'the-gioi', 'kinh-doanh', 'bat-dong-san', 'the-thao', 'lao-dong-viec-lam', 'suc-khoe', 'van-hoa', 'giai-tri', 'suc-manh-so', 'giao-duc', 'an-sinh', 'phap-luat', ]

    node main.mjs -crawl -[category name]  -[number of pages]
    # example 
    node main.mjs crawl -the-thao -3

### Crawl specific news with url

    node main.mjs -crawl -[url]

### Crawl all news 

    node main.mjs -crawl -all

## Storage
The resources (crawled news) is stored in */resources/dan_tri/news* with json format. There are some samples resources in this folder

let puppeteer = require('puppeteer');
let browser = null;
let page = null;

describe('Lazada test', () => {

    beforeAll(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 720
        });
        jest.setTimeout(60000);
    });

    afterAll(async() => {
        await browser.close();
    });

    beforeEach(async() => {
        await page.goto('https://tiki.vn/');
    });

    test('Search Haruki Murakami book', async() => {
        expect.assertions(1);
        try {
            const searchBox = await page.$('input[name=q]');
            await searchBox.type('Haruki Murakami');
            await searchBox.press('Enter');

            await page.waitForNavigation();
            const products = await page.$$('a[class=search-a-product-item]');
            expect(products.length).toBe(16);
        } catch (error) {
            console.log(error);
        }
    });

})
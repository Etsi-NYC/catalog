import puppeteer from 'puppeteer';
import server from '../server/index.js';

let APP = 'http://localhost:4000/product/1';

let page;
let browser;
const width = 1000;
const height = 700;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(APP);
});

afterAll(() => {
  browser.close();
});

describe('related items', () => {
  test(
    'it loads a maximum of 9 related items',
    async () => {
      var numOfListItems = await page.$$eval(
        '.list-item-container',
        lis => lis.length
      );
      expect(numOfListItems).toBeLessThan(10);
    },
    16000
  );

  test(
    'it does not display the same item as the primary-item currently being viewed elsewhere on the page',
    async () => {
      var items = await page.$$eval('.list-item-link', links =>
        links.map(link => link.href)
      );
      var result = true;
      for (let item of items) {
        if (APP === item) {
          result = false;
          break;
        }
      }
      expect(result).toEqual(true);
    },
    16000
  );

  test(
    "it doesn't redirect to the same primary-item as is currently being viewed",
    async () => {
      var currentItem = server.item.id.slice();
      var items = await page.$$eval('.list-item-link', links =>
        links.map(link => link.href)
      );
      await page.goto(items[0]);
      var newItem = server.item.id.slice();
      expect(currentItem).not.toEqual(newItem);
    },
    16000
  );
});

describe('header', () => {
  test(
    'it redirects to the same primary-item as is being viewed',
    async () => {
      await page.goto(APP);
      var currentItem = server.item.id.slice();
      var headerURL = await page.$eval('.header-link', link => link.href);
      await page.goto(headerURL);
      var newItem = server.item.id.slice();
      expect(currentItem).toEqual(newItem);
    },
    16000
  );
});

import cheerioAdv from 'cheerio-advanced-selectors';
import rp from 'request-promise-native';
import _ from 'lodash'
import {writeFileSync, readFileSync} from 'fs';

const async = require('async');

const cheerio = cheerioAdv.wrap(require('cheerio'));

let characters = [];

let poet = JSON.parse(readFileSync('./poet.json')).slice(2000);

let personCount = 0;

let curRequest = 0;

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getPoetryByAuthor = async (author, page = 1) => {

  console.log('正在请求' + author.poetName);

  const options = {
    uri: `http://so.gushiwen.org/authors/authorsw_${author.poetId}A${page}.aspx`,
    transform: body => cheerio.load(body),
    timeout: 2000
  };

  const $ = await rp(options);


  // console.log('正在爬取' + author.poetName);

  let data = [];

  $('.main3 .left .sons .cont').each(function () {
    const poetryUrl = $(this).find('p').first().find('a').attr('href');
    const poetryId = poetryUrl.slice(poetryUrl.lastIndexOf('_') + 1, poetryUrl.lastIndexOf('.'));
    const title = $(this).find('p').first().find('a b').text();
    const content = $(this).find('.contson').text().replace(/\n+/g, '').trim();
    data.push({
      poetryId,
      title,
      content,
      authorId: author.poetId,
      authorName: author.poetName
    });
    characters = _.union(characters, data);
  });

  writeFileSync('./poetry13.json', JSON.stringify(characters, null, 2), 'utf8');

  if (page * 10 >= author.poetryCount) {
    personCount++;
    console.log('爬取' + author.poetName + '完成，当前共爬取' + personCount + '人' + characters.length + '条');
    return
  } else {
    await sleep(80);
    page++;
    getPoetryByAuthor(author, page);
  }
};

export const getPoetry = async () => {
  // async.mapLimit(poet, 30, async function(item) {
  //   await getPoetryByAuthor(item);
  // }, (err, results) => {
  //   if (err) throw err;
  // })
  for (let item of poet) {
    await getPoetryByAuthor(item);
    await sleep(80);
  }
};

getPoetry();
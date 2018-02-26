import cheerioAdv from 'cheerio-advanced-selectors';
import rp from 'request-promise-native';
import _ from 'lodash'
import {writeFileSync} from 'fs';

const cheerio = cheerioAdv.wrap(require('cheerio'));

let characters = [];

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getSingleSentencePoetry = async (page = 964) => {

  // http://www.gushiwen.org/shiwen/default_4A2A${page}.aspx
  // http://www.gushiwen.org/shiwen/default_4A3A${page}.aspx
  const options = {
    uri: `http://www.gushiwen.org/shiwen/default_4A1A${page}.aspx`,
    transform: body => cheerio.load(body)
  };

  console.log('正在爬取第' + page + '页');

  const $ = await rp(options);

  let data = [];

  console.log('正在分析第' + page + '页');

  $('.main3 .left .sons .cont').each(function () {
    const poetryUrl = $(this).find('p').first().find('a').attr('href');
    const poetryId = poetryUrl.slice(poetryUrl.lastIndexOf('_') + 1, poetryUrl.lastIndexOf('.'));
    const poetryName = $(this).find('p').first().find('a b').text();
    const poetName = $(this).find('p.source a').last().text();
    const content = $(this).find('.contson').text();
    // if (content.length < 1600) {
    const singleSentences = content.replace(/(\(|（)[^（\(\)）]*?(\)|）)|\s+|《|》|“|‘|’|”/g, '').trim().split(/\n+|，|。|？|！|：|；|、/g);
    singleSentences.forEach(item => {
      if (item) {
        data.push({
          poetName,
          poetryName,
          poetry: poetryId,
          content: item
        });
      }
    });
    characters = _.union(characters, data);
    // }
  });

  writeFileSync('./new964.json', JSON.stringify(characters, null, 2), 'utf8');

  // 4924 2138 132
  if (page === 1000) {
    console.log("爬取完成，共爬取" + characters.length + '条');
    return
  } else {
    // await sleep(100);
    page++;
    getSingleSentencePoetry(page);
  }

};

getSingleSentencePoetry();

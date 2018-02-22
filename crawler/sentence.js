import cheerioAdv from 'cheerio-advanced-selectors';
import rp from 'request-promise-native';
import _ from 'lodash'
import {writeFileSync} from 'fs';

const cheerio = cheerioAdv.wrap(require('cheerio'));

let characters = [];

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getSentence = async (page = 1) => {

  const options = {
    uri: `http://so.gushiwen.org/mingju/Default.aspx?p=${page}&c=&t=`,
    transform: body => cheerio.load(body)
  };

  console.log('正在爬取第' + page + '页');

  const $ = await rp(options);

  let data = [];

  $('.main3 .left .sons .cont').each(function () {
    const sentenceUrl = $(this).find('a').first().attr('href');
    const sentenceId = sentenceUrl.slice(sentenceUrl.lastIndexOf('_') + 1, sentenceUrl.lastIndexOf('.'));
    const sentenceContent = $(this).find('a').first().text();
    const sentencePoetryUrl = $(this).find('a').eq(1).attr('href');
    const sentencePoetryId = sentencePoetryUrl.slice(sentencePoetryUrl.lastIndexOf('_') + 1, sentencePoetryUrl.lastIndexOf('.'));
    const sentencePoetryString = $(this).find('a').eq(1).text();
    const sentencePoetryName = sentencePoetryString.slice(0, sentencePoetryString.indexOf('《'));
    const sentenceAuthorName = sentencePoetryString.slice(sentencePoetryString.indexOf('《'));
    data.push({
      sentenceId,
      sentenceContent,
      sentencePoetryId,
      sentencePoetryName,
      sentenceAuthorName
    });

    characters = _.union(characters, data);
  });

  writeFileSync('./sentence.json', JSON.stringify(characters, null, 2), 'utf8');

  if (data.length < 50) {
    console.log("爬取完成，共爬取" + characters.length + '条');
    return
  } else {
    await sleep(1000);
    page++;
    getSentence(page);
  }

};

getSentence();

import cheerioAdv from 'cheerio-advanced-selectors';
import rp from 'request-promise-native';
import _ from 'lodash'
import {writeFileSync} from 'fs';

const cheerio = cheerioAdv.wrap(require('cheerio'));

let characters = [];

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getPoet = async (page = 1) => {

  const options = {
    uri: `http://so.gushiwen.org/authors/Default.aspx?p=${page}&c=`,
    transform: body => cheerio.load(body)
  };

  console.log('正在爬取第' + page + '页');

  const $ = await rp(options);

  let data = [];

  $('.main3 .left .sonspic .cont').each(function () {
    const poetUrl = $(this).find('p').first().find('a').attr('href');
    const poetId = poetUrl.slice(poetUrl.indexOf('_') + 1, poetUrl.indexOf('.'));
    const poetName = $(this).find('p').first().find('a b').text();
    const imageUrl = $(this).find('.divimg a img').attr('src');
    const imageId = imageUrl ? imageUrl.slice(imageUrl.lastIndexOf('/') + 1, imageUrl.lastIndexOf('.')) : '';
    const descString = $(this).find('p').eq(1).text();
    const desc = descString.slice(0, descString.lastIndexOf('►'));
    const poetryCount = parseInt(descString.slice(descString.lastIndexOf('►') + 2).match(/^\d+\.?\d*/g)[0]);
    data.push({
      _id: poetId,
      poetName,
      imageId,
      desc,
      poetryCount
    });

    characters = _.union(characters, data);
  });

  writeFileSync('./poet.json', JSON.stringify(characters, null, 2), 'utf8');

  if (data.length < 10) {
    console.log("爬取完成，共爬取" + characters.length + '条');
    return
  } else {
    await sleep(1000);
    page++;
    getPoet(page);
  }

};

getPoet();

const cheerio = require('cheerio');
const request = require('request');
const urlencode = require('urlencode');

// 获取原始数据
async function get(url) {
  // 获取网页
  let html = await getHtml(url, 2000);
  const $ = cheerio.load(html, {decodeEntities: false}, false);
  let tmp = $('.teacher_zc_list tbody td').toArray();
  
  // 教师信息
  let infos = [];
  tmp.forEach((el, idx) => {
    let data = el.children[0]?.data;
    if(idx >= 4) {
      infos.push(data ? data : '');
    }
  });
  // console.log('== infos ==>', infos);
  tmp = $('.teacher_zc_list .w1 a').toArray();
  // 教师名
  let names = tmp.map((el) => {
    return el.children[0].data;
  })

  return getData(names, infos);
}

// 获取HTML，通过请求
function getHtml(url, timeout = 2000) {
  return new Promise((resolve, reject) => {
    request.get(url, {timeout: timeout}, (err, res, body) => {
      err ? reject('timeout!\n') : resolve(body);
    })
  })
}

// 将数据转换为二维数组
function getData(names, infos) {
  let nlen = names.length;
  let ilen = infos.length;
  let i = 0, j = 0;
  var res = [];
  while(i < nlen && j < ilen) {
    let temp = [];
    temp.push(names[i++]);
    j++;
    temp.push(infos[j++]);
    temp.push(infos[j++]);
    temp.push(infos[j++]);
    res.push(temp);
  }
  return res;
}

module.exports = get;
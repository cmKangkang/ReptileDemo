const cheerio = require('cheerio');
const fs = require('fs');
// const { traceDeprecation } = require('process');
const request = require('request');
const urlencode = require('urlencode')
const path = require('path');
const NODES = require('./nodes');

// let url = 'http://cs.whu.edu.cn/teacher.aspx?showtype=jobtitle&typename=%e6%95%99%e6%8e%88';
let base = './tmp';
// let savePath = '';


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

// 保存为txt文件
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

// 导出csv，两个文件 node与 edge
function exportCsv(strbuffer, path) {

}

function exportTxt(data, base, fileName) {
  let str = '';
  data.forEach((el) => {
    let tmp = el[0];
    for(let i = 1; i < el.length; i ++) {
      tmp = `${tmp}, ${el[i]}`;
    }
    str += tmp + '\n';
  })

  try {
    let fpath = path.resolve(base, fileName);
    fs.writeFile(fpath, str, {flag: 'a+'}, (err, data) => {
      if(err) throw err;
      console.log(`${fpath}输出成功！^-^ yeah~`);
    })
  } catch(err) {
    console.log(err);
  }
}

// 处理适合导出csv的数据
function getCsvData(data){
  const ds = data;
  ds.map()
}

// 导出txt
async function getTxtTest() {
  let type = ['教授', '副教授', '研究员', '副研究员', '讲师'];
// let type = ['%E6%95%99%E6%8E%88', '%E5%89%AF%E6%95%99%E6%8E%88', '%E7%A0%94%E7%A9%B6%E5%91%98', '%E5%89%AF%E7%A0%94%E7%A9%B6%E5%91%98', '%E8%AE%B2%E5%B8%88'];
  let showType = ['jobtitle', 'department', 'institute'];
  const baseUrl = 'http://cs.whu.edu.cn/teacher.aspx?';
  for(let i = 0; i < type.length; i++) {
    const url = `${baseUrl}showtype=jobtitle&typename=${urlencode(type[i])}`;
    let origin = await get(url);
    exportTxt(origin, base, `${type[i]}.txt`);
  }
}

// 获取节点
function getNodes(data) {
  let nodes = [];
  const ds = data;
  const reg = /(\([1-9]{1}\))?(.+)/;
  ds.forEach(el => {
    let tmp = el[3].split(',');
    tmp.forEach(el => {
      let keys = el.match(reg);
      if(keys && keys.length > 2) {
        let key = keys[2];
        nodes.indexOf(key) < 0 && nodes.push(key);
      }
    })
  });
  return nodes;
}


// const reg = /(\([1-9]{1}\))?(.+)/
// let str1 = '(1)Java数据库';
// let str2 = 'java数据库';
// console.log(str1.match(reg));
// console.log(str2.match(reg));
async function getNodesTest() {
  let type = ['教授', '副教授', '研究员', '副研究员', '讲师'];
  // let type = ['%E6%95%99%E6%8E%88', '%E5%89%AF%E6%95%99%E6%8E%88', '%E7%A0%94%E7%A9%B6%E5%91%98', '%E5%89%AF%E7%A0%94%E7%A9%B6%E5%91%98', '%E8%AE%B2%E5%B8%88'];
    // let showType = ['jobtitle', 'department', 'institute'];
    let ns = NODES;
    const baseUrl = 'http://cs.whu.edu.cn/teacher.aspx?';
    for(let i = 1; i < type.length; i++) {
      const url = `${baseUrl}showtype=jobtitle&typename=${urlencode(type[i])}`;
      let origin = await get(url);
      let nodes = getNodes(origin);
      // console.log(nodes);
      ns = [...ns, ...nodes];
    }
    let nsf = Array.from(new Set(ns));
    console.log(nsf);
}

getNodesTest();
// console.log(Array.from(new Set(NODES)));
const get = require('../get');
const exportCsv = require('../exportCsv');
const urlencode = require('urlencode');
const NODES = require('../nodes');

// 导出csv文件
const base = './tmp';
const baseUrl = 'http://cs.whu.edu.cn/teacher.aspx?';
const type = ['教授', '副教授', '研究员', '副研究员', '讲师'];
(async function() {
  let data = [];
  for(let i = 0; i < type.length; i++) {
    const url = `${baseUrl}showtype=jobtitle&typename=${urlencode(type[i])}`;
    let origin = await get(url);
    data = data.concat(origin);
  }
  console.log('==> 原始数据获取成功！');
  exportCsv(data, base, 'edge.2.csv', 'node.2.csv');
  console.log('==>csv文件导出完成.');
})();
const get = require('../get');
const exportCsv = require('../exportCsv');
const NODES = require('../nodes');

const base = './tmp';
let url = 'http://cs.whu.edu.cn/teacher.aspx?showtype=jobtitle&typename=%e6%95%99%e6%8e%88';
(async function() {
  const origin = await get(url);
  console.log('==> 原始数据获取成功！');
  exportCsv(origin, base, 'edge.2.csv', 'node.2.csv');
  console.log('==>csv文件导出完成.')
})();
const get = require('../get');
const exportTxt = require('../exportTxt');

let url = 'http://cs.whu.edu.cn/teacher.aspx?showtype=jobtitle&typename=%e6%95%99%e6%8e%88';
(async function() {
  const origin = await get(url);
  exportTxt(origin, './tmp', 'test.1.txt');
})();
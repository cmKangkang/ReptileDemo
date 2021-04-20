const fs = require('fs');
const path = require('path');
const NODES = require('./nodes');

const weight = [
  5, // 教授
  4, // 副教授
  3, // 研究员
  2, // 副研究员
  1, // 讲师
];

function exportCsv(data, base, edgeFileName, nodeFileName) {
  const ds = processData(data);
  let edgeStr = 'source, target, weight\n';
  let nodeStr = 'id, name\n';
  ds.forEach((el) => {
    let tmp = el.join(',');
    edgeStr += tmp + '\n';
  });
  // console.log('edges ==> ', edgeStr);

  NODES.forEach((el, idx) => {
    nodeStr += `${idx},${el}\n`;
  })
  // console.log('nodes ==> ', nodeStr);

  try {
    let edgepath = path.resolve(base, edgeFileName);
    let nodepath = path.resolve(base, nodeFileName);
    fs.writeFile(edgepath, edgeStr, {flag: 'w+'}, (err, data) => {
      if(err) throw err;
      console.log(`${edgepath}输出成功！ ^-^yeah~`);
      fs.writeFile(nodepath, nodeStr, {flag: 'w+'}, (err, data) => {
        if(err) throw err;
        console.log(`${nodepath}输出成功！ ^-^yeah~`); 
      })
    })
  } catch(err) {
    console.log(err);
  }
}

// 处理数据，返回array，形如[[sourse, tar, weight], ...]
function processData(data) {
  var edges = [];
  const ds = data;
  const nlen = NODES.length;
  ds.forEach(el => {
    let key = el[3],
        type = el[2];
    for(let i = 0; i < nlen; i++) {
      for(let j = i + 1; j < nlen; j++) {
        let ni = NODES[i],
            nj = NODES[j];
        if(key.indexOf(ni) >= 0 && key.indexOf(nj) >= 0) {
          let w;
          switch(type) {
            case "教授" : w = weight[0]; break;
            case "副教授" : w = weight[1]; break;
            case "研究员" : w = weight[2]; break;
            case "副研究员" : w = weight[3]; break;
            case "讲师" : w = weight[4]; break;
          }
          // [source, target, weight]，图为无向图
          let tmp = [i, j, w];
          edges.push(tmp);
        }
      }
    }
  });
  return edges;
}

module.exports = exportCsv;
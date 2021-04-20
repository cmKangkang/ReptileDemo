const fs = require('fs');
const path = require('path');

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

module.exports = exportTxt;

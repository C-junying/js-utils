const fs = require('fs');
const path = require('path');

// 目录路径
const dirPath = 'd:/temp_temp_temp';

// 1-文件 2-目录 3-文件和目录
const flag = 1;
// 将文件名存在 'name' 的文件删除
const name = /name/;

batchDelFiles();

function delFile(filePath, file) {
  if (name.test(file)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('删除文件失败', err);
      } else {
        console.log('成功删除文件：', filePath);
      }
    });
  }
}

function batchDelFiles() {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('读取目录失败：', err);
      return;
    }

    files.forEach((file) => {
      // 文件路径
      const filePath = path.join(dirPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('获取文件信息失败：', err);
          return;
        }

        if (flag === 1 && stats.isFile()) {
          delFile(filePath, file);
        }
        if (flag === 2 && stats.isDirectory()) {
          delFile(filePath, file);
        }
        if (flag === 3) {
          delFile(filePath, file);
        }
      });
    });
  });
}

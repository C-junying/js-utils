const fs = require('fs');
const path = require('path');

const dirPath = 'e:/temp'; // 当前目录

// 1-文件 2-目录 3-文件和目录
const flag = 1;
// 将文件名的 'oldName' 替换成 'newName'
const oldName = 'oldName';
const newName = 'newName';

batchRenameFiles();

function renameFile(filePath, file) {
  // 获取新文件名
  const newFileName = file.replace(oldName, newName);
  // 拼接新路径
  const newFilePath = path.join(dirPath, newFileName);
  fs.rename(filePath, newFilePath, (err) => {
    if (err) {
      console.error('重命名文件失败：', err);
    } else {
      console.log('成功重命名文件：', filePath, '->', newFilePath);
    }
  });
}

function batchRenameFiles() {
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
          renameFile(filePath, file);
        }
        if (flag === 2 && stats.isDirectory()) {
          renameFile(filePath, file);
        }
        if (flag === 3) {
          renameFile(filePath, file);
        }
      });
    });
  });
}

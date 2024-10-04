const fs = require('fs');
const path = require('path');

// 使用示例
const sourceDirectory = 'path/to/sourceDir'; // 源目录
const targetDirectory = 'path/to/targetDir'; // 目标目录

copyDirToSubdirs(sourceDirectory, targetDirectory);

function copyDirToSubdirs(sourceDir, targetDir) {
  // 确保源目录存在
  if (!fs.existsSync(sourceDir)) {
    console.error('源目录不存在');
    return;
  }

  // 获取目标目录下的所有子目录
  fs.readdir(targetDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('读取目标目录失败:', err);
      return;
    }

    files.forEach((file) => {
      if (file.isDirectory()) {
        const subDirPath = path.join(targetDir, file.name);
        const destinationPath = path.join(subDirPath, path.basename(sourceDir));

        // 复制目录
        copyDirectory(sourceDir, destinationPath);
      }
    });
  });
}

function copyDirectory(source, destination) {
  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) {
      console.error('创建目标目录失败:', err);
      return;
    }
  });

  // 读取源目录的内容
  fs.readdir(source, (err, files) => {
    if (err) {
      console.error('读取源目录失败:', err);
      return;
    }

    files.forEach((file) => {
      const srcFilePath = path.join(source, file);
      const destFilePath = path.join(destination, file);

      fs.stat(srcFilePath, (err, stats) => {
        if (err) {
          console.error('获取文件信息失败：', err);
          return;
        }

        if (stats.isFile()) {
          // 复制文件
          fs.copyFile(srcFilePath, destFilePath, (err) => {
            if (err) {
              console.error(`复制文件失败: ${srcFilePath} -> ${destFilePath}`, err);
            }
          });
        }
        if (stats.isDirectory()) {
          // 递归复制目录
          copyDirectory(srcFilePath, destFilePath);
        }
      });
    });
  });
}


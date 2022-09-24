// node fs模块
const fs = require("fs");
// node path模块
const path = require("path");

// 收集所有的文件路径
const arr = [];
const fileDisplay = (filePath) => {
  //根据文件路径读取文件，返回文件列表
  return new Promise((resolve) => {
    fs.readdir(filePath, function (err, files) {
      if (err) return console.error("Error:(spec)", err);
      files.forEach((filename) => {
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        // fs.stat(path)执行后，会将stats类的实例返回给其回调函数。
        fs.stat(filedir, (eror, stats) => {
          if (eror) return console.error("Error:(spec)", err);
          // 是否是文件
          const isFile = stats.isFile();
          // 是否是文件夹
          const isDir = stats.isDirectory();
          if (isFile) {
            // 这块我自己处理了多余的绝对路径，第一个 replace 是替换掉那个路径，第二个是所有满足\\的直接替换掉
            arr.push(
              filedir
                .replace(
                  "D:\\lh\\study\\jiaoshoujia\\vue\\generator-lh-vue\\generators\\app\\",
                  ""
                )
                .replace(/\\/gim, "/")
            );
          }
          // 如果是文件夹
          if (isDir) fileDisplay(filedir);
        });
      });
    });

    setTimeout(() => {
      resolve(arr);
    }, 1000);
  });
};
module.exports = fileDisplay;

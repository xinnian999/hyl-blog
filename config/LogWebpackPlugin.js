class LogWebpackPlugin {
  constructor() {}
  apply(compiler) {
    compiler.plugin("emit", function (compilation, callback) {
      // compilation.chunks 是存放了所有的代码块，是一个数组，我们需要遍历
      compilation.chunks.forEach(function (chunk) {
        /*
         * chunk 代表一个代码块，代码块它是由多个模块组成的。
         * 我们可以通过 chunk.forEachModule 能读取组成代码块的每个模块
         */
        chunk.forEachModule(function (module) {
          // module 代表一个模块。
          // module.fileDependencies 存放当前模块的所有依赖的文件路径，它是一个数组
          module.fileDependencies.forEach(function (filepath) {
            // console.log(filepath);
          });
        });
        /*
         webpack 会根据chunk去生成输出的文件资源，每个chunk都对应一个及以上的输出文件。
         比如在 Chunk中包含了css 模块并且使用了 ExtractTextPlugin 时，
         那么该Chunk 就会生成 .js 和 .css 两个文件
        */
        chunk.files.forEach(function (filename) {
          // compilation.assets 是存放当前所有即将输出的资源。
          // 调用一个输出资源的 source() 方法能获取到输出资源的内容
          const source = compilation.assets[filename].source();
          console.log(source);
        });
      });
      /*
       该事件是异步事件，因此要调用 callback 来通知本次的 webpack事件监听结束。
       如果我们没有调用callback(); 那么webpack就会一直卡在这里不会往后执行。
      */
      callback();
    });
  }
}

// 导出插件
module.exports = LogWebpackPlugin;

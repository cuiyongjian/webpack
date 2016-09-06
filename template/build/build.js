// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// rm('-rf', assetsPath)
// 直接删public算了
rm('-rf', config.build.assetsRoot)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

// 写当前上下文路径，到backend里面，方便backend进行ajax转发时，知道请求的根path
// var contextConf = {
//   contextPath: config.build.assetsPublicPath
// };
// require('fs').writeFile(config.build.config, JSON.stringify(contextConf, null, '\t'))

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})

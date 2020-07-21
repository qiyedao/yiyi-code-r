const path = require('path');
const ora = require('ora');


const cmdPath = process.cwd();
exports.cmdPath = cmdPath;

/** 模板文件夹路径 */
exports.templatePath = path.resolve(__dirname, '../template');

/** 配置文件名称和路径 */
const configFileNames = ['moduleConfig.json','.babelrc','server.js','template.html','webpack.config.js','package.json'];
exports.configFileNames = configFileNames;
exports.configFilePath = path.resolve(cmdPath,'src');

/** 生成api协议文件夹目录 */
exports.outDir = path.resolve(cmdPath, 'src');

exports.layoutFileName = "index.js";
exports.layoutConstantName = "constant.js";

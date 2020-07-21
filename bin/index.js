#!/usr/bin/env node   
const fs = require('fs'); 
const path = require('path');
const program = require('commander'); 
let i = 0
const ora = require('ora')
const {cmdPath, templatePath, configFileNames, configFilePath, outDir,layoutFileName,layoutConstantName} = require('../constants/path')
const excludeFiles = [".babelrc", "moduleConfig.json", "server.js", "template.html", "webpack.config.js","package.json"]
const chileProcess = require('child_process')
var Step = require('step');


const initConfig =  (a,b) => {
    const spinner = ora(` 生成配置文件...`).start();
    let _configFilePath = configFilePath;
    let _outDir = outDir;
  
    if(a) {
      _configFilePath = path.resolve(cmdPath, a)
    }
  
    if(b) {
      _outDir = path.resolve(cmdPath, b)
    }
    console.log(_outDir)
    try {
  
    //   if(fs.existsSync(configFilePath)) {
    //     throw `${configFileName} 文件已存在，生成失败！`
    //   }
  
      /* 模板内容 */
      if(!fs.existsSync(_outDir)){
        fs.mkdirSync(_outDir)
      }

      configFileNames.map(item=>{
        let fileContent = fs.readFileSync(path.resolve(templatePath, item));
        if(item == 'moduleConfig.json'){
          fs.writeFileSync(path.resolve(_outDir,item), fileContent);

        }else{
          fs.writeFileSync(path.resolve(cmdPath,item), fileContent);

        }
        /* 写入内容 */
      })
      Step(
        mapDir(
          templatePath,
          _outDir,
          function(file,pathname,cmdPathName) {
          //  console.log("file",pathname)
            // 读取文件后的处理
            mkdirsSync(cmdPathName,pathname)
          },
          function() {
            
          }
        ),
        function(){
          spinner.succeed("已完成")
        }
    
      )
     
     
     
      
       
      

    } catch(e) {
        console.log(e)
      spinner.fail(e);
    }finally{
        
    }
  }

    function mapDir (dir,cmdPath, callback, finish) {
    fs.readdir(dir, function(err, files) {
      if (err) {
        console.log(err)
        return
      }
      files.forEach((filename, index) => {
        // console.log("一级目录",filename)
        let pathname = path.join(dir, filename)
        let cmdPathName = path.join(cmdPath, filename.replace("demo/",""))
        fs.stat(pathname, (err, stats) => { // 读取文件信息
          if (err) {
            console.log('获取文件stats失败')
            return
          }
          if (stats.isDirectory()) {
            mapDir(pathname,cmdPathName, callback, finish)
          } else if (stats.isFile()) {

            if (['configFileName'].includes(path.extname(pathname))) {  // 排除 目录下的 json less 文件
              return
            }
            fs.readFile(pathname, (err, data) => {
              if (err) {
                console.log(err)
                return
              }
              callback && callback(data,pathname,cmdPathName)
            })
          }
        })
        if (index === files.length - 1) {
          finish && finish()
        }
      })
    })
  }
  
  
  
// 递归创建目录 同步方法
function mkdirsSync(dirname,orignName) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname),orignName)) {
      // console.log(path.extname(dirname),'orignName',path.basename(dirname))
        if(path.extname(dirname)){

          if(excludeFiles.indexOf(path.basename(dirname))<0){
            if(fs.existsSync(path.dirname(orignName))){
              let data = fs.readFileSync(orignName)
              fs.writeFileSync(dirname,data)
            }
          }
          
        }else{
          if(excludeFiles.indexOf(path.basename(dirname))<0){
            fs.mkdirSync(dirname)

          }
        }
        
      return true;
    }
  }
}

const renderJSX =()=>{

  return `import Axios from '../../common/Yiyi-axios'`
}
const createModule = async(a,b) => {
  let _configFilePath = configFilePath;
let _outDir = outDir;

if(a) {
  _configFilePath = path.resolve(cmdPath, a)
}

if(b) {
  _outDir = path.resolve(cmdPath, b)
}


  const spinner = ora(`生成模块文件...`).start();
  try {

      if(!fs.existsSync(_configFilePath)){
          throw `please run init fisrt`
      }
      moduleName = require(path.resolve(_configFilePath,'moduleConfig.json')).moduleName
      console.log("模块名",moduleName)
      if(!fs.existsSync(_outDir)) {
          fs.mkdirSync(_outDir);
        }
      moduleName.map((item,index)=>{

          let _tempOutDir = path.resolve(_outDir,item.key)
          if(!fs.existsSync(_tempOutDir)) {
              fs.mkdirSync(_tempOutDir);
          
            let flag = {"key":item.key,"store":item.key+"Store"}
            console.log(flag,'flag')
            let modulePath = path.resolve(_tempOutDir,"module")
            if(!fs.existsSync(modulePath)){
                fs.mkdirSync(modulePath)
            }
            let storePath = path.resolve(_tempOutDir,'store')
            if(!fs.existsSync(storePath)){
                fs.mkdirSync(storePath)
            }
            const flagPath = path.resolve(_tempOutDir, 'flag.json')

            const moduleIndexPath = path.resolve(modulePath, 'index.js')
            const moduleAddPath = path.resolve(modulePath,'add.js')
            const moduleEditPath = path.resolve(modulePath,'edit.js')
            const moduleAddModalPath = path.resolve(modulePath,'addModal.js')
            const moduleEditModalPath = path.resolve(modulePath,'editModal.js')
            const storeIndexPath = path.resolve(storePath,'index.js')
            if(!fs.existsSync(moduleIndexPath)){
             const moduleIndexContent = fs.readFileSync(path.resolve(templatePath,"demo/module/index.js"))
              fs.writeFileSync(moduleIndexPath,moduleIndexContent)
            }
            if(!fs.existsSync(moduleAddPath)){
              const moduleAddContent = fs.readFileSync(path.resolve(templatePath,"demo/module/add.js"))
               fs.writeFileSync(moduleAddPath,moduleAddContent)
             }
             if(!fs.existsSync(moduleEditPath)){
                 const moduleEditContent = fs.readFileSync(path.resolve(templatePath,"demo/module/edit.js"))
              fs.writeFileSync(moduleEditPath,moduleEditContent)
              }
              if(!fs.existsSync(moduleAddModalPath)){
                const moduleAddContent = fs.readFileSync(path.resolve(templatePath,"demo/module/addModal.js"))
                 fs.writeFileSync(moduleAddModalPath,moduleAddContent)
               }
               if(!fs.existsSync(moduleEditModalPath)){
                   const moduleEditContent = fs.readFileSync(path.resolve(templatePath,"demo/module/editModal.js"))
                fs.writeFileSync(moduleEditModalPath,moduleEditContent)
                }
             if(!fs.existsSync(storeIndexPath)){
              
              const storeIndexContent = fs.readFileSync(path.resolve(templatePath,"demo/store/index.js"))
              fs.writeFileSync(storeIndexPath,storeIndexContent)
              // console.log(storeIndexContent)
              }
              if(!fs.existsSync(flagPath)){


                fs.writeFileSync(flagPath,JSON.stringify(flag))
              }
            }
      })
      
      
    

    spinner.succeed();

  } catch(e) {
      console.log(e)
    spinner.fail(e);
  }
}

const createLayout = async(a,b) => {
  let _configFilePath = configFilePath;
let _outDir = outDir;

if(a) {
  _configFilePath = path.resolve(cmdPath, a)
}

if(b) {
  _outDir = path.resolve(cmdPath, b)
}


  const spinner = ora(`生成菜单文件...`).start();
  try {
      if(!fs.existsSync(_configFilePath)){
          throw `please run init fisrt`
      }
      
      if(!fs.existsSync(_outDir)) {
          fs.mkdirSync(_outDir);
        }
        let _tempOutDir = path.resolve(_outDir,"layout")
          if(!fs.existsSync(_tempOutDir)) {
              fs.mkdirSync(_tempOutDir);
            }
        let layoutFilePath = path.resolve(_tempOutDir,layoutFileName)
        let layoutConstantsPath = path.resolve(_tempOutDir,layoutConstantName)
        if(!fs.existsSync(layoutFilePath)){
           const layoutFileContent =  fs.readFileSync(path.resolve(templatePath,"layout/index.js"))
              fs.writeFileSync(layoutFilePath,layoutFileContent)
          }
          if(!fs.existsSync(layoutConstantsPath)){
              const layoutConstantsContent =  fs.readFileSync(path.resolve(templatePath,"layout/constant.js"))
                 fs.writeFileSync(layoutConstantsPath,layoutConstantsContent)
             }
      
      
    

    spinner.succeed();
    createModule()

  } catch(e) {
      console.log(e)
    spinner.fail(e);
  }finally{
  }
}
program
  .command('init [configFile] [outDir]')
  .description('生成配置文件')
  .action(initConfig)
program
  .command('create [configFile] [outDir]')
  .description('创建模块')
  .action(createModule);
  program
  .command('createMenu [configFile] [outDir]')
  .description('创建菜单')
  .action(createLayout);
// program.version(package.version, '-v,--version')
    //    .command('init <name>')
    //    .action(name=>{
    //        console.log(name)
    //    })
//   program.parse(process.argv);
program
  .version(require('../package').version)
  .parse(process.argv);
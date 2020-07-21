'use strict'
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  console.log('WEBPACK ENV:', env)

  // VARIABLES
  const isProduction = env === 'production'
  const isDev = env === 'development'

  //// PLUGGINS ////

  // cleans 'dist' folder everytime before a new build
  const CleanPLugin = new CleanWebpackPlugin(['dist'], {
    root: __dirname,
    verbose: true,
    dry: false
  })

  const AnalyzerPlugin = new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
    
    
  })

  // const HTMLPlugin = new HtmlWebpackPlugin({
  //   template: 'template.html',
  //   chunksSortMode: 'none'
  // })
  let htmlArr = [new HtmlWebpackPlugin({
    title:"示例",
    
    chunks:['vendor','manifest',"index/index"], //引入的js
    template: "./template.html",
    filename :  "index.html" ,
    minify:{//压缩html
      collapseWhitespace: true,
      preserveLineBreaks: true
    },
  }),
  new HtmlWebpackPlugin({
    title:"app",
    
    chunks:['vendor','manifest',`appmini/index`], //引入的js
    template: "./template.html",
    filename :  "appmini.html", 
    minify:{//压缩html
      collapseWhitespace: true,
      preserveLineBreaks: true
    },
  })
]
  // BUILDING WEBPACK
  const config = {}

  // config.entry = ['babel-polyfill', './src/app.js']
  config.entry = {
    "index/index":'./src/index.js',
    "appmini/index":'./src/appmini.js'
  }
  config.output = {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  }

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  }

  // config.plugins = [CleanPLugin, AnalyzerPlugin, HTMLPlugin]
  config.plugins = [ CleanPLugin,...htmlArr,AnalyzerPlugin]

  config.module = {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      },
      // {
      //   test: /\.html$/,
      //   loader: 'raw-loader'
      // },  
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },            
        {
        test: /\.less/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                
            },
            {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true
                }
            }
        ]
    },
     
    ]
  }

  config.resolve = {
    extensions: ['.js','.jsx']
  }

  if (isProduction) {
    config.output = {
      path: path.join(__dirname, 'dist'),
      chunkFilename: '[name].[chunkhash].bundle.js',
      filename: '[name].[chunkhash].bundle.js'
    }
    config.mode = 'production'
    config.devtool = 'source-map'
  }

  if (isDev) {
    config.output = {
      path: path.join(__dirname, 'dist'),
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.js'
    }

    config.mode = 'development'
    config.devtool = 'inline-source-map'

    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      host:'localhost',
      port:8520,
      overlay: {//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
        errors: true
      },
      inline: true,
      open: false,
      hot: true
    }
   
  }
  

  return config
}

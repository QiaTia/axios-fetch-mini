const path = require('path')
// const env = process.env.NODE_ENV

module.exports = {
  // mode: process.env.NODE_ENV,
  devtool: "inline-source-map",
  entry: { 'index':  path.join(__dirname, 'src', 'index.ts'), },
  // devtool: false,
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin(),
  //   ],
  // },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path:  path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer:{
    //服务器的IP地址，可以使用IP也可以使用localhost
    host:'localhost',
    //服务端压缩是否开启
    compress: true,
    //配置服务端口号
    port: 8080,
    // 实时刷新  
    // inline: true,
    hot: true
  }
}
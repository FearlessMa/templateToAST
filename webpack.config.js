const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'./test/')
  },
  devtool:"inline-source-map",
  devServer:{
    port:9000,
    contentBase:path.resolve(__dirname,'./test')
  }
};

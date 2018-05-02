import path from 'path';
module.exports = {
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: path.join(__dirname, './node_modules'),
        loader: 'babel-loader'
      }
    ]
  }
}
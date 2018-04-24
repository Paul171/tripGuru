import path from 'path';
module.exports = {
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: path.join(__dirname, './node_modules'),
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-react')],          
          cacheDirectory: true,
        }
      }
    ]
  }
}
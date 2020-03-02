const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

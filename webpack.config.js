const path = require('path');

const config = {
    entry: './test/js/main-webpack.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './test/js')
      }
}

module.exports = config;
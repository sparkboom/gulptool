import {resolve} from 'path';

export default {

    entry: resolve(`src/index.js`),
    module: {
        rules : [
          {
            test: /\.js/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          }

        ],
        loaders: [{
            test: /\.js/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }]
    }
}

import {resolve} from 'path';
import webpack from 'webpack';

export default {

    output: {
        path: resolve(`dist/`),
        filename: 'myapp.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: true
        })
    ],
    devtool: 'source-map'
}

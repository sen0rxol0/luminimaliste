const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const env = process.env.NODE_ENV || 'development';
module.exports = {
    mode: env,
    entry: path.join(__dirname, 'resources/js/index.js'),
    output: {
        filename: 'bundle.app.js',
        path: path.resolve(__dirname, 'public/js')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};

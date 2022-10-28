const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        port: 8080,
        hot: true,
        open: true,
        compress: true
    },
    entry: {
        about: './src/pages/About.js',
        home: './src/pages/Home.js',
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveReportTo: 'report.html',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env','@babel/preset-react'] },
            },
            {
                test: /\.js$/i,
                use: "babel-loader",
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.js']
                },
                sideEffects: false
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
            // @TODO js rule
            // @TODO css rule
        ],
    },
    optimization: {
        usedExports: true,
        concatenateModules: true,
        minimize: true,
        moduleIds: "deterministic",
        innerGraph: true,
        splitChunks: {
            minSize: 20000,
            minRemainingSize: 0,
            maxAsyncRequests: 25,
            enforceSizeThreshold: 50000,
            minChunks: 1,
            chunks: "all",
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node modules[\\]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        runtimeChunk: {
            name: "runtime"
        },

    },
    target: "web",
    resolve: {
        fallback: {
            'buffer': require.resolve('buffer'),
            'stream': false,
            'crypto': require.resolve('crypto')
        },
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'node_modules/ui/node_modules'),
        ]
    },
    stats: {
        children: true
    }
    // @TODO optimizations
    // @TODO lodash treeshaking
    // @TODO chunk for lodash
    // @TODO chunk for runtime
    // @TODO fallback for crypto
};

module.exports = config;

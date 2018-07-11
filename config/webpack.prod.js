var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");

const ENV = process.env.NODE_ENV = process.env.ENV = "production";
// const ENV = process.env.NODE_ENV;

module.exports = webpackMerge(commonConfig, {
    devtool: "source-map",

    output: {
        path: helpers.root("dist"),
        publicPath: "/",
        filename: "[name].[hash].js",
        chunkFilename: "[id].[hash].chunk.js"
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        //     beautify: false,
        //     mangle: {
        //         keep_fnames: true,
        //         screw_ie8: true
        //     },
        //     comments: false
        // }),
        new ExtractTextPlugin("[name].[hash].css"),
        new webpack.DefinePlugin({
            "process.env": {
                "ENV": JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                minimize: true,
                debug: true
            }
            // options: {
            //     htmlLoader: {
            //         minimize: false // workaround for ng2
            //     }
            // }
        })
    ]
});
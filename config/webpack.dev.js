var webpack = require('webpack');
var webpackMerge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");
const express = require('express');
const permissions = require('../routes/restricted/permissions');
const users = require('../routes/restricted/users');
const accounts = require('../routes/restricted/accounts');
const logout = require('../routes/logout');
require('dotenv').config();
const app = express();

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",

    output: {
        path: helpers.root("dist"),
        publicPath: "http://localhost:3000/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
          "process.env" : {
            NODE_ENV : JSON.stringify(process.env.NODE_ENV)
          }
        })
    ],

    devServer: {
        setup: (app, server) => {
          const proxy = require('http-proxy-middleware');
          const bodyParser = require('body-parser');

          let options = {
            target: "http://admin:admin@192.168.86.200:4444",
            pathRewrite: {
              '^/api/generate_tabs':'/v1/Distinct',
              '^/api/searchTerms':'/v1/Terms',
              '^/api/Search': '/v1/Search',
              '^/api/*':'/v1/',
              },
            }
          let myProxy = proxy(options);

          app.use('/api', myProxy);
          app.use(bodyParser.json());
          app.all("/**", bodyParser.json(), (req, res, next) => {
            next();
          })

          app.use('/photos', express.static(process.env.PHOTOS_MOUNT_POINT));
          app.use('/videos', express.static(process.env.VIDEOS_MOUNT_POINT));
          app.use('/usersDb', users);
          app.use('/accountsDb', accounts);
          app.use('/permissionsDb', permissions);
          app.use('/logout', logout);

        },
        historyApiFallback: true,
        stats: "minimal",
    }
});

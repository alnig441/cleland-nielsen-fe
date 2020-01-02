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
          let bodyParser = require('body-parser');
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
        proxy: {
          "/api/**": {
            target: "http://admin:admin@localhost:4000",
            pathRewrite: (req, options) => {              
              req = req.replace(/\/api/, '/v1');
              let splitReq = req.split('/');
              
              if(req.match(/\/generate_tabs/)) {  
                return req.replace(/\/generate_tabs/, '/Distinct');
              } 
              
              if(req.match(/\/searchTerms/)) {
                return req.replace(/searchTerms/, 'Terms');
              }
              
              if(splitReq[2].length >= 24 ) {
                let partial = '';
                if(options.method == 'GET') { partial = `SearchById` }
                if(options.method == 'POST') { partial = `UpdateById` }
                if(options.method == 'DELETE') { partial = `RemoveById` }
                return req.replace(/\/v1/, `/v1/${partial}`);
              }
              
              else {
                return req;
              }
              
            }
          }
        }
    }
});
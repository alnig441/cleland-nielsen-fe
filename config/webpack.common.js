var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");

module.exports = {
    entry: {
        "polyfills": "./src/polyfills.ts",
        "vendor": "./src/vendor.ts",
        "app": [ "bootstrap-loader", "./src/main.ts" ]
    },

    resolve: {
        extensions: [
            ".js", ".ts"
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ "ts-loader?configFileName=config/tsconfig.json", "angular2-template-loader" ]
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.pug$/,
                use: [ "raw-loader", "pug-html-loader" ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ "raw-loader", "sass-loader" ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
                use: "file-loader?name=assets/[name].[hash].[ext]"
            },
            {
                test: /\.css$/,
                exclude: helpers.root("src", "app"),
                use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader?sourceMap" })
            },
            {
                test: /\.css$/,
                include: helpers.root("src", "app"),
                use: "raw-loader"
            },

            // LOAD BOOTSTRAP JQUERY SCRIPTS

            // {    // BOOTSTRAP4 - appears not working
            //     test: /bootstrap\/dist\/js\/umd\//,
            //     use: 'imports-loader?jQuery=jquery'
            // },

            // {   // BOOTSTRAP3 - appears not necessary
            //     test: /bootstrap-sass\/assets\/javascripts\//,
            //     use: 'imports-loader?jQuery=jquery'
            // },

            // LOAD BOOTSTRAP ICON FONTS
            {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000'
            },

            {
                test: /\.(ttf|eot)$/,
                use: 'file-loader'
            }

        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: [ "app", "vendor", "polyfills" ]
        }),

        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),

        // Workaround for Angular-SystemJS-Webpack(2) WARNINGS
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'), // location of your src
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),

        // FOR BOOTSTRAP 4 - appears not working ..
        // new ExtractTextPlugin({fileName: 'app.css', allChunks: true}),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether"
        }),

    ]
};
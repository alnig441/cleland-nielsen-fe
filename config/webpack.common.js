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
                // use: [ "raw-loader", "pug-html-loader" ]
                use: [
                    {
                        loader: "raw-loader"
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            doctype: "html"
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [ "raw-loader", "sass-loader" ]
            },


            //BOOTSTRAP + FONT-AWESOME fonts - BEGIN
            {
                test: /\.(woff2?(\?v=[0-9]\.[0-9]\.[0-9])|svg)$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            //BOOTSTRAP + FONT-AWESOME fonts - END


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


            // LOAD BOOTSTRAP JQUERY SCRIPTS - BEGIN
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                use: 'imports-loader?jQuery=jquery'
            },
            // LOAD BOOTSTRAP JQUERY SCRIPTS - END


            // LOAD FONT-AWESOME CONFIG FILE - BEGIN
            {
                test: /font-awesome\.config\.js/,
                use: [ "style-loader", "font-awesome-loader" ]

            },
            // LOAD FONT-AWESOME CONFIG FILE - END

            // JSON LOADER
            {
                test: /\.json$/,
                loader: 'json-loader'
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

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether"
        }),

    ]
};
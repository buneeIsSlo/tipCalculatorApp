const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = "production";

module.exports = {
    mode: devMode,

    entry: {
        app: path.resolve(__dirname, "src/js/app.js"),
    },

    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "js/[name].[contenthash].bundle.js",
        assetModuleFilename: "imgs/[name][ext]",
        clean: true,
    },

    devtool: "inline-source-map",

    devServer: {
        contentBase: path.resolve(__dirname, "./docs"),
        port: 5001,
        open: true,
        hot: true,
        watchContentBase: true,
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },

            {
                test: /(\.css)$/,
                use: [
                    devMode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    }
                ]
            },

            {
                test: /\.(svg|ico|webp|png|jpg|jpeg|gif)$/,
                type: "asset/resource"
            },

            {
                test: /\.html/g,
                use: ["html-loader"]
            }
        ]
    },

    plugins: [new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src/index.html"),
        }),

        new MiniCssExtractPlugin({
            filename: "css/main.[contenthash].css"
        })
    ],

}
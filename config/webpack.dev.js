const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { DefinePlugin } = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[contenthash:8].js",
        path: path.resolve(__dirname, "../build")
    },
    mode: "development",
    devtool: "cheap-module-source-map",
    resolve: {
        alias: {
            "@": path.resolve("src")
        },
        extensions: ['.vue', '...']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: [/node_modules/],
                use: ["vue-loader"]
            },
            // {
            //     test: /\.js$/,
            //     use: ["babel-loader"]
            // },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: "asset",
                generator: {
                    filename: "img/[name].[hash:6].[ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 700 * 1024
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff2)$/i,
                type: "asset/resource",
                generator: {
                    filename: "font/[name].[hash:6].[ext]"
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Vue Demo",
            template: "./public/index.html"
        }),
        new DefinePlugin({
            BASE_URL: '"./"'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: [
                            "**/index.html",
                            ".DR_Store"
                        ]
                    }
                }
            ]
        })

    ]
}
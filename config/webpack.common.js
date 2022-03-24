const { resolvePath } = require("./paths")
const devConfig = require("./webpack.dev")
const prodConfig = require("./webpack.prod")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { DefinePlugin } = require("webpack")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { merge } = require("webpack-merge")

const commonConfig = {
    entry: resolvePath('./src/index.js'),
    output: {
        filename: "[name].[hash:6].js",
        path: resolvePath("./build")
    },
    resolve: {
        alias: {
            "@": resolvePath("./src")
        },
        extensions: ['.vue', '.js', '...']
    },
    module: {
        rules: [
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: [
                    "vue-loader",
                    "eslint-loader"
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
        new DefinePlugin({
            BASE_URL: '"./"'
        }),
        new HtmlWebpackPlugin({
            title: "Vue Demo",
            template: resolvePath('./public/index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: [
                            "**/index.html",
                            "**/.DR_Store"
                        ]
                    }
                }
            ]
        })
    ]
}


module.exports = function (env) {
    const isProduction = env.production
    const config = isProduction ? prodConfig : devConfig

    return merge(commonConfig, config)
}
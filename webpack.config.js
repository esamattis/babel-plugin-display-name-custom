var webpack = require("webpack");
var path = require("path");

var config = {
    entry: "./demo/index.js",
    output: {
        path: __dirname + "/demo/dist",
        filename: "bundle.js",
        publicPath: "/",
    },
    // devtool: "cheap-module-eval-source-map", // faster
    devtool: "sourceMap",
    resolve: {
        alias: {
            "react-simple$": path.resolve(__dirname, "index.js"),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
};


module.exports = config;

/**
 * Created by dcg on 16/8/17.
 */
var webpack = require('webpack');
var path = require('path');
var loaders = [
    {
        test: /\vux.src.*?js$/,
        loader: 'babel'
    },
    {
        "test": /\.js?$/,
        "exclude": /node_modules/,
        "loader": "babel",
        "query": {
            "presets": [
                "es2015",
                "stage-2"
            ]
        }
    },
    {
        "test": /\.vue?$/,
        "loader": "vue"
    },
    {
        "test": /\.less$/,
        "loader": "style!css!less"
    },
    {
        "test":/\.css$/,
        "loader": "style!css"
    },
    { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader'},
];
module.exports = {
    entry: './main.js',
    output: {
        path: './dist',
        filename: 'build.js'
    },
    vue: {
        loaders:{
            js: 'babel'
        }
    },
    module: {
        loaders: loaders
    },
    watch: true
};
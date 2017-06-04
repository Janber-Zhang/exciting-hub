/**
 * Created by dcg on 16/8/17.
 */
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: './main.js',
    output: {
        path: './dist',
        filename: 'build.js'
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime'] //这个必须install babel-plugin-transform-runtime  -g
    },
    resolve: {
       extensions: ['', '.js','.css', '.vue'],
       alias: {  
           'vue': 'vue/dist/vue.js'  
       } 
    },
    module: {
        loaders: [
            {test: /\.vue$/,loader: "vue"}, 
            {test: /\.js$/,loader: 'babel',exclude: /node_modules/},
            {test: /\.css$/,loader: "style!css"},
            {test: /\.less$/,loader: "style!css!less"},
            {test: /\.(html|tpl)$/, loader: 'html-loader' },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader'},
        ] 
    }, 
    watch: true
};
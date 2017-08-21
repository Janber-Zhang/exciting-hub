/**
 * Created by dcg on 16/8/17.
 */
var webpack = require('webpack');
var path = require('path');
var projectRoot = './../../../'
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
        // preLoaders: [
        //     {
        //         test: /\.js$/,           // 只针对js文件
        //         loader: 'eslint',        // 指定启用eslint-loader
        //         // include: projectRoot,
        //         exclude: [/node_modules/]// 剔除掉不需要利用eslint审查的文件
        //     },
        //     {
        //         test: /\.vue$/,          // 只针对js文件
        //         loader: 'eslint',        // 指定启用eslint-loader
        //         // include: projectRoot,
        //         exclude: [/node_modules/]// 剔除掉不需要利用eslint审查的文件
        //     }
        // ],
        loaders: [
            {test: /\.vue$/,loader: "vue"}, 
            {test: /\.js$/,loader: 'babel',exclude: /node_modules/},
            {test: /\.css$/,loader: "style!css"},
            {test: /\.less$/,loader: "style!css!less"},
            {test: /\.(html|tpl)$/, loader: 'html-loader' },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader'},
        ] 
    },
    // eslint: {
    //     configFile: path.resolve(projectRoot, '.eslintrc.js'), // 指定eslint的配置文件在哪里
    //     failOnWarning: true, // eslint报warning了就终止webpack编译
    //     failOnError: true, // eslint报error了就终止webpack编译
    //     cache: true, // 开启eslint的cache，cache存在node_modules/.cache目录里
    // },
    watch: true
};
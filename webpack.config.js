const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	cache: true,
	context: process.cwd(),
	devtool: 'source-map',
	devServer: {
		inline: true,
		port: 3333
	},
	resolve: {
		modules: [
			path.resolve('./node_modules')
		],
		extensions: ['.js']
	},
	entry: {
		'main': './src/js/App.js'
	},
	output: {
		path: path.join(process.cwd(), 'build'),
		filename: '[name].js',
		sourceMapFilename: '[file].map'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.ejs'
		}),
		new ExtractTextPlugin({
			filename: '[name].css'
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new CopyWebpackPlugin([{
			from: './src/data/**/*',
			to: 'data',
			flatten: true
		}]),
		new CopyWebpackPlugin([{
			from: './src/images/**/*',
			to: 'images',
			flatten: true
		}])
	],
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			use: {
				loader: 'eslint-loader',
				options: {
					failOnError: true
				}
			},
			exclude: [/node_modules/]
		},{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		},{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		},{
			test: /\.js$/,
			exclude: [/node_modules/],
			use: 'babel-loader'
		}]
	},
	target: 'web'
};

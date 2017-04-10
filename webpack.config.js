var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				//resolve-url-loader may be chained before sass-loader if necessary
				use: ['css-loader?minimize=true&importLoaders=2', 'postcss-loader', 'sass-loader']
			})
		}, {
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		}]
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
	],
	devServer: {
		contentBase: './src',
	},
	performance: {
		hints: false
	},
	devtool: 'eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			},
			comments: false
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
const path = require('path')
const HtmlWbpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	mode: 'development', // development production
	entry: path.resolve(__dirname, '../src/index.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name]-[hash:5].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/g,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.css$/i, use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// esModule: true,
						},
					},
					'css-loader',
					'postcss-loader'
				],
				exclude: /(node_modules)/
			},
			{
				test: /\.less$/g, use: [
					{
						loader: MiniCssExtractPlugin.loader,
						// options: {
						// 	hmr: process.env.NODE_ENV === 'development',
						// },
					},
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
				exclude: /(node_modules)/,
			},
			{
				test: /\.(jpg|png|gif|bmp|jpeg)$/, use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'images-[name].[hash:7].[ext]',
						publicPath: './'
					}

				},
				exclude: /(node_modules)/
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name]-[hash:7].[ext]',
						outputPath: path.join(__dirname, '/dist/assets/fonts'),
					}
				}]
			},
		]
	},
	plugins: [
		new HtmlWbpackPlugin({
			title: 'VUE_SSR',
			template: path.join(__dirname, '../src/index.html'),
			filename: 'index.html',
			inject: 'body',
			favicon: path.join(__dirname, '../src/assets/favicon/lp_128X128.ico'),
			// chunks: ["common", 'index']
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
			cssProcessorOptions: {
				discardComments: { removeAll: true }
			},
			canPrint: true
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		}
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		// publicPath: "/",
		compress: true,
		// host: '0.0.0.0',
		port: 8989,
		open: true,
		hot: true,
		noInfo: true,
		open: true,
		// before(app) {
		// 	app.get('/some/path', function (req, res) {
		// 		res.json({ custom: 'response' });
		// 	});
		// },
		// proxy: {
		// 	"/api": {
		// 		target: "https://other-server.example.com",
		// 		changeOrigin: true
		// 	}
		// }
		// pathRewrite: {
		// 	'^/index': '/' //在这里 http://localhost:8080/index/xxx 已经被替换成 http://10.20.30.120:8080/
		// }
	},
	devtool: 'cheap-eval-source-map',
	externals: {}
}
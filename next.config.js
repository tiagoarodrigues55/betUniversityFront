const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config, { dev }) => {
		config.plugins.push(
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
			})
		);
		return config;
	},
};

module.exports = nextConfig;

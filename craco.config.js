module.exports = {
    webpack: {
        configure: (webpackConfig, { env }) => {
            // Disable code splitting
            webpackConfig.optimization.splitChunks = false;
            // Disable the runtime chunk
            webpackConfig.optimization.runtimeChunk = false;

            // Set the output filenames
            webpackConfig.output.filename = 'static/js/[name].js';
            webpackConfig.output.chunkFilename = 'static/js/chunk.js';

            // Add publicPath to include /build
            if(process.env.PUBLIC_URL) {
                webpackConfig.output.publicPath = process.env.PUBLIC_URL;
            }

            // Update CSS filenames
            webpackConfig.plugins = webpackConfig.plugins.map(plugin => {
                if (plugin.constructor.name === 'MiniCssExtractPlugin') {
                    plugin.options.filename = 'static/css/[name].css';
                }
                return plugin;
            });

            return webpackConfig;
        }
    }
};
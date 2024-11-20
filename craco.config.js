module.exports = {
    webpack: {
        configure: (webpackConfig, { env }) => {
            // Disable code splitting
            webpackConfig.optimization.splitChunks = false;

            // Disable the runtime chunk
            webpackConfig.optimization.runtimeChunk = false;
            webpackConfig.output.filename = 'static/js/[name].js';
            webpackConfig.output.chunkFilename = 'static/js/chunk.js';
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
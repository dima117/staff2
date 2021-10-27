import { resolve } from 'path';
import * as webpack from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';

const config: webpack.Configuration = {
    mode: 'development',
    entry: {
        index: './src/client/index.ts',
    },
    output: {
        path: resolve(__dirname, 'public'),
        filename: '[name]-[contenthash:8].js',
        chunkFilename: '[id]-[chunkhash:8].js',
        clean: true,
    },
    plugins: [
        new WebpackAssetsManifest({
            entrypoints: true,
        }),
    ],
};

export default config;

import { resolve } from 'path';
import * as webpack from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';

const config: webpack.Configuration = {
    mode: 'development', // TODO: ENV DEV
    entry: {
        index: './src/client/index.ts',
    },
    output: {
        path: resolve(__dirname, 'public'),
        filename: '[name]-[contenthash:8].js', // TODO: ENV PROD
        chunkFilename: '[id]-[chunkhash:8].js', // TODO: ENV PROD
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.client.json',
                    }
                },
            },
        ]
    },
    plugins: [
        new WebpackAssetsManifest({
            entrypoints: true,
        }),
    ],
    optimization: {
        chunkIds: 'named',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                }
            }
        },
    },
    devtool: 'source-map',  // TODO: ENV DEV
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            src: resolve(__dirname, 'src'),
        },
    }
};

export default config;

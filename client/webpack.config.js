const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Set the mode to development for local server
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',  // Output file name
      path: path.resolve(__dirname, 'dist'), // Output directory
    },
    plugins: [
      // Plugin to generate HTML files
      new HtmlWebpackPlugin({
        title: 'Jate App',
        template: './index.html',
        // filename: './index.html',
        // chunks: ['main']
      }),
      
      // Plugin to inject service worker into the build
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        swDest: 'service-worker.js', // Output service worker file name
      }),

      // Generate Web App Manifest
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "JATE text editor",
        short_name: "JATE",
        description: "Just another text editor.",
        background_color: "#228B22",
        theme_color: "#228B22",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve(`src/images/logo.png`), // Path to icon
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons")
          }
        ]
      })
    ],

    // Module rules
    module: {
      // Rule for handling CSS files
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Rule for transpiling JavaScript files using Babel
        {
          test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Note the comma after the presets array
            plugins: ['transform-class-properties']
            }
          }
        }
      ]
    }
  };
};
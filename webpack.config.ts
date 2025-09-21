import * as path from "path"
import { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import "webpack-dev-server"

module.exports = (_: any, argv: { mode: string }): Configuration => {
  const isDev = argv.mode === "development"

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDev ? "[name].js" : "[name].[contenthash].js",
      clean: true,
      publicPath: isDev ? "/" : "/history-animated/",
      publicPath: isDev ? "/" : "/history-animated/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { browsers: ["last 2 versions"] } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
              },
            },
          ],
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  // auto: (resPath: string) => {
                  //   // Включаем модули только для файлов с .module. и не из node_modules
                  //   return resPath.includes(".module.") && !resPath.includes("node_modules")
                  // },
                  localIdentName: isDev ? "[local]" : "[local]",
                  namedExport: false,
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: "convertColors",
                      params: {
                        currentColor: true,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|woff2|woff)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[hash][ext][query]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css",
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3000,
      hot: true,
      historyApiFallback: true,
      open: true,
    },
    devtool: isDev ? "eval-source-map" : "source-map",
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  }
}

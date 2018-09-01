const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.ts",
    test: "./test/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  mode: "development",
};

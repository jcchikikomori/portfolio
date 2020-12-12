{
  [
    {
      test: /\.scss$/,
      use: ["vue-style-loader", "css-loader", "sass-loader"]
    }
  ];
  exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/portfolio/" : "/"
  };
}

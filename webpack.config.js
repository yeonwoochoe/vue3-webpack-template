//import

//path : NodeJS에서 파일 및 디렉토리 경로 작업을 위한 전역 모듈
const path = _require("path");
const HtmlPlugin = _require("html-webpack-plugin");
const CopyPlugin = _require("copy-webpack-plugin");
const { VueLoaderPlugin } = _require("vue-loader");
module.exports = {
  resolve: {
    extensions: [".js", ".vue"],
    //경로별칭
    alias: {
      "~": path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
    },
  },

  //parcel index.html
  //파일을 읽어들이기 시작하는 진입점 설정
  //webpack js를 기준으로함
  entry: "./src/main.js",
  //결과물(번들)을 반환하는 설정
  output: {
    // 주석은 기본값!, `__dirname`은 현재 파일의 위치를 알려주는 NodeJS 전역 변수
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true,
  },

  //모듈 처리 방식을 설정
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },

      //스타일 설정
      {
        test: /\.s?css$/,
        //순서중요
        use: [
          "vue-style-loader",
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: "file-loader",
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
    new VueLoaderPlugin(),
  ],

  //개발 서버 옵션
  devServer: {
    host: "localhost",
  },
};

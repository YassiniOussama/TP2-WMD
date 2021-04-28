const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./client/index.html",
    filename: "./index.html"
});
module.exports = (env, argv) => {
    console.log(argv.mode);
    return {
        entry: "./client/index.jsx",
        devtool: "eval-source-map",
        output: { // NEW
            path: path.join(__dirname, 'dist'),
            filename: "[name].js"
        }, // NEW Ends
        plugins: [htmlPlugin],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                      "style-loader", // handlebars loader expects raw resource string
                      "css-loader",
                    ],
                  },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    loader: "file-loader",
                    options: { name: '/static/[name].[ext]' }
                }

            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css']
        },
        watch: argv.mode === 'development',


    };
};

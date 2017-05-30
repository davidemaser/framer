/**
 * Created by David Maser on 30/05/2017.
 */
module.exports = {
  entry: "./app.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    loaders: []
  },
  externals: {
    jquery: 'jQuery',
    $: 'jQuery'
  }
};
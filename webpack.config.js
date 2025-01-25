// webpack.config.js (example)
module.exports = {
    // ... other config
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'src')], // Important!
    },
  };
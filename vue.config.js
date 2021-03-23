module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
  pwa: {
    name: 'plasm-apps',
  },
};

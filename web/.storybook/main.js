const projectConfig = require("../webpack.config.js");

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../**/*.stories.[tj]sx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    })
    config.resolve.alias = {
      ...config.resolve.alias,
      ...projectConfig.resolve.alias,
    }
    return config
  },
  addons: [
    "@storybook/addon-essentials",
    '@storybook/addon-knobs',
    '@storybook/addon-interactions',
    'storybook-addon-i18next',
  ],
  features: {
    interactionsDebugger: true,
  },
};


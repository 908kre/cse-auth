module.exports = {
  stories: ["../**/stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-knobs",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
};

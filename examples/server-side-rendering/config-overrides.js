const webpack = require('webpack');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const { injectBabelPlugin } = require('react-app-rewired');
const LoadablePlugin = require('@loadable/webpack-plugin');
const fs = require('fs');
const path = require('path');

const { override, addDecoratorsLegacy, disableEsLint } = require('customize-cra');

const setupWebpack = config => {
  config.plugins.push(new LoadablePlugin());
  config = injectBabelPlugin('@loadable/babel-plugin', config);

  return config;
};

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  (config, env) => rewireStyledComponents(config, env, { ssr: true }),
  config => setupWebpack(config),
);

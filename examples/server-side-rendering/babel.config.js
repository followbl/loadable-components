
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          useBuiltIns: 'entry',
          exclude: ['babel-plugin-transform-regenerator', 'transform-async-to-generator'],
        },
      ],
    ],
    plugins: [
      '@loadable/babel-plugin',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-syntax-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
        },
      ],
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-async-generators',
    ],
  };
};

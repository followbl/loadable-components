const path = require('path');
const debug = require('debug')('build:backpack');

const dir = process.env.DIR;

// Make sure webpack transpiles files in the shared folder
const transpileShared = config => {
  config.module.rules.forEach(rule => {
    if (rule.loader.indexOf('/babel-loader/') === -1) {
      return;
    }

    // if (dir === 'server') {
    //   rule.include.push(path.resolve(__dirname, `./src`));
    // }
  });

  return config;
};

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [`./${dir}/index.ts`];

    config.resolve = {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    };

    config.output.path = path.join(process.cwd(), `build-${dir}`);
    const nodePath = (process.env.NODE_PATH || '')
      .split(path.delimiter)
      .filter(folder => folder && !path.isAbsolute(folder))
      .map(folder => path.resolve('./', folder))
      .join(path.delimiter);

    if (!config.resolve.modules) config.resolve.modules = [];
    config.resolve.modules.push(nodePath);
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
    };
    config.resolve.modules.push(path.join(nodePath, `./${dir}`));
    config.resolve.modules.push(path.join(nodePath, `./node_modules`));

    config.module.rules.unshift({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    });

    return transpileShared(config);
  },
};

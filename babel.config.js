module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extends: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@src': './src/',
            '@components': './src/components',
            '@screens': './src/screens',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@theme': './src/theme',
            '@routes': './src/routes',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};

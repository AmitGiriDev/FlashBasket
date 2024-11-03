module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@features': './src/features',
          '@components': './src/components',
          '@state': './src/state',
          '@service': './src/service',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};

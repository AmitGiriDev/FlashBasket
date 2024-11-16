module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'react-native-paper/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@features': './src/features',
          '@styles': './src/styles',
          '@constants': './src/constants',
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

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './app/assets',
          '@hooks': './app/hooks',
          '@screens': './app/screens',
          '@components': './app/components',
          '@core-navigations': './app/navigation',
          '@constants': './app/core-constants',
          '@core-utils': './app/utils',
          '~': './',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};

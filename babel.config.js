module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv'],
      // [
      //   'expo-location',
      //   {
      //     locationAlwaysAndWhenInUsePermission:
      //       'Allow Flamingo to use your location.',
      //   },
      // ],
      // [
      //   'expo-image-picker',
      //   {
      //     photosPermission:
      //       'The app accesses your photos to let you share them with your friends.',
      //   },
      // ],
      'react-native-reanimated/plugin',
    ],
  };
};

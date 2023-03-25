module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: [
          'FIREBASE_API_KEY',
          'FIREBASE_AUTH_DOMAIN',
          'FIREBASE_PROJECT_ID',
          'FIREBASE_STORAGE_BUCKET',
          'FIREBASE_MESSAGING_SENDER_ID',
          'FIREBASE_APP_ID',
        ],
        safe: false,
        allowUndefined: false,
        verbose: false,
      },
    ],
  ],
};

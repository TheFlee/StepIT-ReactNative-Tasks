// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/**',
      '.expo/**',
      'node_modules/**',
      '.expo-export-test/**',
      '.expo-web-check/**',
      '.expo-test-export/**',
    ],
  },
  {
    rules: {
      'import/no-unresolved': [
        'error',
        {
          ignore: ['\\.css$'],
        },
      ],
    },
  },
]);

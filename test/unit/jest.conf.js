/* eslint-disable key-spacing */
const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$'          : '<rootDir>/src/$1',

    // main
    '^app/(.*)$'        : '<rootDir>/src/app/$1',
    '^core/(.*)$'       : '<rootDir>/src/core/$1',

    // app
    '^views/(.*)$'      : '<rootDir>/src/app/views/$1',
    '^pages/(.*)$'      : '<rootDir>/src/app/views/pages/$1',
    '^elements/(.*)$'   : '<rootDir>/src/app/views/elements/$1',
    '^ui/(.*)$'         : '<rootDir>/src/app/views/ui/$1',

    // core
    '^utils(.*)$'       : '<rootDir>/src/core/utils/$1',
  },
  transform: {
    '^.+\\.js$'         : '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$'       : '<rootDir>/node_modules/vue-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ],
  setupFiles: [
    '<rootDir>/test/unit/setup'
  ],
  mapCoverage: true,
  coverageDirectory     : '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
}

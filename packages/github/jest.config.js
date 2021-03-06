module.exports = {
  "testEnvironment": "node",
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "@swissquote/crafty-preset-jest/src/esm-transformer"
  },
  "collectCoverage": true,
  "coveragePathIgnorePatterns": [
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/main/**/*.(j|t)s"
  ],
  "testMatch": [
    "<rootDir>/src/test/js/*.js",
    "<rootDir>/src/test/ts/*.ts"
  ],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "<rootDir>/src/test/stub"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "preset": "ts-jest",
  "globals": {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.test.json"
    }
  }
}

module.exports = {
    transform: { '^.+.(tsx|mjs|js|html)$': 'ts-jest', "^.+\\.(js|jsx)$": "babel-jest"},
    transformIgnorePatterns: ['node_modules/(?!.*.mjs$)', 'node_modules/(?!axios)', "/node_modules/(?!(uuid)/)"],

    "verbose": true
  }
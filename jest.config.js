module.exports = {
  testMatch: ["**/spec/**/*.+(ts|tsx|js)", "**/*.spec.(ts|tsx)"],
  transform: {
    "^.+\\.(js|ts|tsx)$": ["ts-jest"]
  },
  globals: {
    "ts-jest": {
      tsconfig: "test/tsconfig.jest.json"
    }
  },
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1"
  },
  testEnvironment: "jsdom"
}

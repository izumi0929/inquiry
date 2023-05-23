module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/spec/**/*.+(ts|tsx|js)", "**/*.spec.(ts|tsx)"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsconfig: "test/tsconfig.jest.json"
    }
  },
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1"
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
}

module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/spec/**/*.+(ts|tsx|js)", "**/*.spec.(ts|tsx)"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsconfig: "test/tsconfig.jest.json",
      diagnostics: false
    }
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
}

module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    project: "./tsconfig.json"
  },
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier"
  ],
  plugins: ["import", "import-access", "strict-dependencies", "unused-imports"],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
    "prefer-const": "error",
    "no-var": "error",
    "no-unused-vars": "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "react/jsx-key": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "@next/next/no-img-element": 0,
    "import-access/jsdoc": "error",
    "react/no-unused-prop-types": "error",
    "no-restricted-imports": ["error", { patterns: ["../../", "../../../"] }],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-misused-promises": [
      "warn",
      {
        checksVoidReturn: false
      }
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_"
      }
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type"
        ],
        pathGroups: [
          {
            pattern: "~/**",
            group: "internal",
            position: "before"
          }
        ],
        pathGroupsExcludedImportTypes: ["type"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        "newlines-between": "always"
      }
    ],
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }]
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./"
      }
    }
  }
}

module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true
  },
  settings: {
    react: {
      version: "18.2",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:testing-library/react",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: [
    "import",
    "react",
    "@typescript-eslint",
    "react-hooks",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    "react-hooks/rules-of-hooks": 2, // Checks rules of Hooks
    "quotes": [2, "double"],
    "semi": [2, "always"]
  }
};

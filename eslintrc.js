module.exports = {
  // "no-restricted-imports": "off",
  // "@typescript-eslint/no-restricted-imports": [
  //   "warn",
  //   {
  //     "name": "react-redux",
  //     "importNames": ["useSelector", "useDispatch"],
  //     "message": "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
  //   }
  // ],
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'ESNEXT',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'vite'
  ],
  rules: {
    "no-unused-vars": "off",
    "no-restricted-imports": "off"
  }
}

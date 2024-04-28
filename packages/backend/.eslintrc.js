module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    root: false,
    env: {
        node: true,
        jest: true
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/consistent-type-imports': 'error'
    }
};

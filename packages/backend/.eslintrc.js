module.exports = {
    env: {
        node: true,
        jest: true,
        browser: true,
        // es2021: true
    },
    ignorePatterns: [],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'unused-imports'],
    rules: {
        // 'prettier/prettier': 'warn',
        // 'no-restricted-imports': [],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'generic',
            },
        ],
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'no-implied-eval': 'off',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        // Find and remove unused es6 module imports
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        semi: ['error', 'always'],
        'func-style': ['error', 'expression'],
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'variable',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            },
            {
                selector: 'function',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
    },
    settings: {},
};

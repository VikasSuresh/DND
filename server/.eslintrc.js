module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-underscore-dangle': [2, { allow: ['_id', '__dirname', '_getData', '_isEndCalled'] }],
        indent: [2, 4],
        'template-curly-spacing': [2, 'always'],
        'object-curly-spacing': [2, 'always'],
        'computed-property-spacing': [2, 'always'],
        'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
        quotes: [2, 'single', 'avoid-escape'],
        'no-use-before-define': [2, { functions: false }],
        'prefer-const': 1,
        'max-len': ['error', { code: 200 }],
        complexity: ['error', { max: 10 }],
    },
};

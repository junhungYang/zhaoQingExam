module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    'rules': {
        'arrow-parens': 0,
        'semi': [1,'never'],
        'indent': [2,4]
    }
}
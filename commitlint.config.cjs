module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'header-korean': (parsed) => [
          /[가-힣]/.test(parsed.header ?? ''),
          'header must include Korean text',
        ],
        'body-korean': (parsed) => [
          /[가-힣]/.test(parsed.body ?? ''),
          'body must include Korean text',
        ],
        'body-min-line-count': (parsed, _when, value) => {
          const lines = (parsed.body ?? '')
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);

          return [lines.length >= value, `body must have at least ${value} lines`];
        },
      },
    },
  ],
  rules: {
    'header-min-length': [2, 'always', 1],
    'header-korean': [2, 'always'],
    'body-empty': [2, 'never'],
    'body-korean': [2, 'always'],
    'body-min-line-count': [2, 'always', 2],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-full-stop': [2, 'never', '.'],
  },
};

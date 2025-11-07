module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce 100 character limit on all lines
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],

    // Type must be one of these
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only changes
        'style',    // Code style changes (formatting, semicolons, etc)
        'refactor', // Code refactoring (neither fixes a bug nor adds a feature)
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'chore',    // Maintenance tasks (deps, config, etc)
        'ci',       // CI/CD changes
        'build',    // Build system changes
        'revert',   // Revert previous commit
      ],
    ],

    // Scope must be one of these
    'scope-enum': [
      2,
      'always',
      [
        'core',
        'react',
        'react-ui',
        'react-query',
        'nextjs',
        'vue',
        'vue-ui',
        'angular',
        'svelte',
        'docs',
        'ci',
        'deps',
        'release',
      ],
    ],

    // Scope is required
    'scope-empty': [2, 'never'],

    // Subject must be lowercase
    'subject-case': [2, 'always', 'lower-case'],

    // Subject cannot be empty
    'subject-empty': [2, 'never'],

    // Subject must not end with a period
    'subject-full-stop': [2, 'never', '.'],
  },
};

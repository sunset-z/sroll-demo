export default {
  branches: ['master'],
  repositoryUrl: 'https://github.com/sunset-z/sroll-demo.git',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'revert', release: 'patch' },
          { type: 'docs', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'chore', release: 'patch' },
          { type: 'test', release: 'patch' },
          { scope: 'no-release', release: false },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    // [
    //   '@semantic-release/npm',
    //   {
    //     tarballDir: 'release',
    //     npmPublish: false, // 禁用 npm 发布
    //   },
    // ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['dist/**/*', 'package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/exec',
      {
        verifyReleaseCmd: 'echo "Verifying release version ${nextRelease.version}"',
        prepareCmd: 'yarn pack:release', // 自定义打包脚本
        publishCmd: 'npm run publish',
      },
    ],
  ],
};

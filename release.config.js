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
          { type: 'del', release: 'patch' },
          { scope: 'no-release', release: false },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        // 更改 package.json 的 version
        npmPublish: false, // 禁用 npm 发布
      },
    ],
    [
      '@semantic-release/exec',
      {
        verifyReleaseCmd: 'echo "Verifying release version ${nextRelease.version}"',
        // prepareCmd: 'yarn pack:release', // 自定义打包脚本
        // publishCmd: 'npm publish', // 未指定具体 tgz 文件，将会再执行 npm pack
        prepareCmd: 'npm run build:npm', // 下载依赖
        publishCmd: 'npm run release', // 打包、发布一体
      },
    ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        // assets: ['dist/**/*', 'package.json', 'CHANGELOG.md'], // 这里会跟根目录一同打包
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};

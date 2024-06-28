/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ['master'], // 基于
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
          // { type: 'chore', release: 'patch' },
          { type: 'test', release: 'patch' },
          { type: 'del', release: 'patch' },
          { scope: 'no-release', release: false },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    // ------ 上面不变 ------
    // {
    //   // 自定义推送命令，将构建产物、package.json 和 CHANGELOG.md 推送到指定分支
    //   path: '@semantic-release/exec',
    //   cmd: `
    //     git config --global user.name "semantic-release-bot"
    //     git config --global user.email "semantic-release-bot@example.com"
    //     git checkout -b release-branch
    //     git add -f dist/ package.json CHANGELOG.md
    //     git commit -m "chore(release): \${nextRelease.version} [skip ci]"
    //     git push --force origin release-branch
    //   `,
    // },

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
        successCmd: `
          git config --global user.name "semantic-release-bot"
          git config --global user.email "semantic-release-bot@martynus.net"
          git checkout -b npm
          git add -f dist/ package.json CHANGELOG.md .gitignore
          git commit -m "chore(release): \${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}"
          git push --force origin npm
        `,
      },
    ],
    '@semantic-release/git',
    // [
    //   '@semantic-release/git',
    //   {
    //     assets: ['dist/**/*', 'package.json', 'CHANGELOG.md'], // 这里会跟根目录一同打包 ????
    //     message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    //   },
    // ],
    '@semantic-release/github',
  ],
};

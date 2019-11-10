module.exports = {
  title: "Spring Boot Seed",
  description: "Spring Boot with MyBatis",
  base: "/seed-docs/",

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      {
        text: "MyBatis",
        items: [
          { text: "基础", link: "/mybatis/basic/" },
          { text: "进阶", link: "/mybatis/advence/" }
        ]
      },
      {
        text: "Seed代码",
        link: "https://github.com/CHAAAAA/springboot-seed"
      }
    ],
    sidebar: {
      "/guide/": ["", "ide", "develop", "maven", "config", "other"],
      "/": [""]
    },
    displayAllHeaders: true, // 默认值：false
    // sidebar: "auto",
    lastUpdated: "Last Updated", // string | boolean
    // sidebarDepth: 2,
    // repo: "vuejs/vuepress",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: "查看源码",

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: "CHAAAAA/seed-docs",
    // 假如文档不是放在仓库的根目录下：
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "master",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "编辑页面！"
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@alias": "docs"
      }
    }
  }
};

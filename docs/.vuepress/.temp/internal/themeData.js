export const themeData = JSON.parse("{\"logo\":\"/miku.png\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"游戏开发\",\"children\":[{\"text\":\"图形\",\"link\":\"/notes/游戏开发/图形/\"},{\"text\":\"网络\",\"link\":\"/notes/游戏开发/网络/\"},{\"text\":\"算法\",\"link\":\"/notes/游戏开发/算法/\"},{\"text\":\"程序设计\",\"link\":\"/notes/游戏开发/程序设计/\"}]},{\"text\":\"项目实战\",\"children\":[{\"text\":\"基于帧同步的MOBA\",\"link\":\"/notes/项目实战/基于帧同步的MOBA/\"},{\"text\":\"基于状态同步的MMO\",\"link\":\"/notes/项目实战/基于状态同步的MMO/\"}]},{\"text\":\"番剧赏评\",\"link\":\"/notes/番剧赏评/\"},{\"text\":\"游戏赏评\",\"link\":\"/notes/游戏赏评/\"}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}

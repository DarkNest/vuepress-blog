export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E8%B5%8F%E8%AF%84/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏赏评/index.html.js"), meta: {"title":"游戏赏评"} }],
  ["/notes/%E7%95%AA%E5%89%A7%E8%B5%8F%E8%AF%84/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/番剧赏评/index.html.js"), meta: {"title":"番剧赏评"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E5%9B%BE%E5%BD%A2/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/图形/index.html.js"), meta: {"title":"图形"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/index.html.js"), meta: {"title":"程序设计"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%AE%97%E6%B3%95/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/算法/index.html.js"), meta: {"title":"算法"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%BD%91%E7%BB%9C/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/网络/index.html.js"), meta: {"title":"网络"} }],
  ["/notes/%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98/%E5%9F%BA%E4%BA%8E%E5%B8%A7%E5%90%8C%E6%AD%A5%E7%9A%84MOBA/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/项目实战/基于帧同步的MOBA/index.html.js"), meta: {"title":"基于帧同步的MOBA"} }],
  ["/notes/%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98/%E5%9F%BA%E4%BA%8E%E7%8A%B6%E6%80%81%E5%90%8C%E6%AD%A5%E7%9A%84MMO/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/项目实战/基于状态同步的MMO/index.html.js"), meta: {"title":"基于状态同步的MMO"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E5%9B%BE%E5%BD%A2/Blur%E6%95%88%E6%9E%9C%E5%AE%9E%E7%8E%B0%E4%B8%8E%E5%BA%94%E7%94%A8/Blur%E6%95%88%E6%9E%9C%E5%AE%9E%E7%8E%B0%E4%B8%8E%E5%BA%94%E7%94%A8.html", { loader: () => import(/* webpackChunkName: "Blur效果实现与应用.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/图形/Blur效果实现与应用/Blur效果实现与应用.html.js"), meta: {"title":"Blur效果实现与应用"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/Unity%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F/Unity%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html", { loader: () => import(/* webpackChunkName: "Unity单例模式.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/Unity单例模式/Unity单例模式.html.js"), meta: {"title":"单例模式"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/Wav%E6%96%87%E4%BB%B6%E8%A7%A3%E6%9E%90/Wav%E6%96%87%E4%BB%B6%E8%A7%A3%E6%9E%90.html", { loader: () => import(/* webpackChunkName: "Wav文件解析.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/Wav文件解析/Wav文件解析.html.js"), meta: {"title":"Wav文件解析"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/%E5%AE%9A%E6%97%B6%E7%B3%BB%E7%BB%9F/%E5%AE%9A%E6%97%B6%E7%B3%BB%E7%BB%9F.html", { loader: () => import(/* webpackChunkName: "定时系统.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/定时系统/定时系统.html.js"), meta: {"title":"定时系统"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%AE%97%E6%B3%95/Boids%E7%AE%97%E6%B3%95%E5%AE%9E%E8%B7%B5/Boids%E7%AE%97%E6%B3%95%E5%AE%9E%E8%B7%B5.html", { loader: () => import(/* webpackChunkName: "Boids算法实践.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/算法/Boids算法实践/Boids算法实践.html.js"), meta: {"title":"Boids算法实践"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%BD%91%E7%BB%9C/%E5%9F%BA%E4%BA%8EKCP%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1/%E5%9F%BA%E4%BA%8EKCP%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1.html", { loader: () => import(/* webpackChunkName: "基于KCP的网络通信.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/网络/基于KCP的网络通信/基于KCP的网络通信.html.js"), meta: {"title":"基于KCP的网络通讯"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%BD%91%E7%BB%9C/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80.html", { loader: () => import(/* webpackChunkName: "计算机网络基础.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/网络/计算机网络基础/计算机网络基础.html.js"), meta: {"title":"计算机网络基础"} }],
  ["/notes/%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98/%E5%9F%BA%E4%BA%8E%E7%8A%B6%E6%80%81%E5%90%8C%E6%AD%A5%E7%9A%84MMO/1_%E9%A1%B9%E7%9B%AE%E6%A1%86%E6%9E%B6/1_%E9%A1%B9%E7%9B%AE%E6%A1%86%E6%9E%B6.html", { loader: () => import(/* webpackChunkName: "1_项目框架.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/项目实战/基于状态同步的MMO/1_项目框架/1_项目框架.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/VuePress/blogweb/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}

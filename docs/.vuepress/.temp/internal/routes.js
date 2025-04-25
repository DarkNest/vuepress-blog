export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E5%9B%BE%E5%BD%A2/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/图形/index.html.js"), meta: {"title":"图形"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/index.html.js"), meta: {"title":"程序设计"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%AE%97%E6%B3%95/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/算法/index.html.js"), meta: {"title":"算法"} }],
  ["/notes/%E7%BE%8E%E6%9C%AF%E6%8A%80%E5%B7%A7/%E5%83%8F%E7%B4%A0%E8%89%BA%E6%9C%AF/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/美术技巧/像素艺术/index.html.js"), meta: {"title":"网络"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E5%9B%BE%E5%BD%A2/Blur%E6%95%88%E6%9E%9C%E5%AE%9E%E7%8E%B0%E4%B8%8E%E5%BA%94%E7%94%A8/Blur%E6%95%88%E6%9E%9C%E5%AE%9E%E7%8E%B0%E4%B8%8E%E5%BA%94%E7%94%A8.html", { loader: () => import(/* webpackChunkName: "Blur效果实现与应用.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/图形/Blur效果实现与应用/Blur效果实现与应用.html.js"), meta: {"title":"Blur效果实现与应用"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/Unity%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F/Unity%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html", { loader: () => import(/* webpackChunkName: "Unity单例模式.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/Unity单例模式/Unity单例模式.html.js"), meta: {"title":"单例模式"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/Wav%E6%96%87%E4%BB%B6%E8%A7%A3%E6%9E%90/Wav%E6%96%87%E4%BB%B6%E8%A7%A3%E6%9E%90.html", { loader: () => import(/* webpackChunkName: "Wav文件解析.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/Wav文件解析/Wav文件解析.html.js"), meta: {"title":"Wav文件解析"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/%E5%AE%9A%E6%97%B6%E7%B3%BB%E7%BB%9F/%E5%AE%9A%E6%97%B6%E7%B3%BB%E7%BB%9F.html", { loader: () => import(/* webpackChunkName: "定时系统.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/定时系统/定时系统.html.js"), meta: {"title":"定时系统"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%AE%97%E6%B3%95/Boids%E7%AE%97%E6%B3%95%E5%AE%9E%E8%B7%B5/Boids%E7%AE%97%E6%B3%95%E5%AE%9E%E8%B7%B5.html", { loader: () => import(/* webpackChunkName: "Boids算法实践.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/算法/Boids算法实践/Boids算法实践.html.js"), meta: {"title":"Boids算法实践"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%BD%91%E7%BB%9C/%E5%9F%BA%E4%BA%8EKCP%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1/%E5%9F%BA%E4%BA%8EKCP%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1.html", { loader: () => import(/* webpackChunkName: "基于KCP的网络通信.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/网络/基于KCP的网络通信/基于KCP的网络通信.html.js"), meta: {"title":"基于KCP的网络通讯"} }],
  ["/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%BD%91%E7%BB%9C/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80.html", { loader: () => import(/* webpackChunkName: "计算机网络基础.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/游戏开发/网络/计算机网络基础/计算机网络基础.html.js"), meta: {"title":"计算机网络基础"} }],
  ["/notes/%E7%BE%8E%E6%9C%AF%E6%8A%80%E5%B7%A7/%E5%83%8F%E7%B4%A0%E8%89%BA%E6%9C%AF/PixelArtTutorials/PixelArtTutorails.html", { loader: () => import(/* webpackChunkName: "PixelArtTutorails.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/美术技巧/像素艺术/PixelArtTutorials/PixelArtTutorails.html.js"), meta: {"title":"Pixcel Art Tutorails"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
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

import comp from "E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏技术/Boids算法实践/Boids算法实践.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E6%B8%B8%E6%88%8F%E6%8A%80%E6%9C%AF/Boids%E7%AE%97%E6%B3%95%E5%AE%9E%E8%B7%B5/Boids%E7%AE%97%E6%B3%95%E5%AE%9E%E8%B7%B5.html\",\"title\":\"Boids算法实践\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"算法原理\",\"slug\":\"算法原理\",\"link\":\"#算法原理\",\"children\":[]},{\"level\":3,\"title\":\"代码实践\",\"slug\":\"代码实践\",\"link\":\"#代码实践\",\"children\":[]},{\"level\":3,\"title\":\"测试优化\",\"slug\":\"测试优化\",\"link\":\"#测试优化\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"notes/游戏技术/Boids算法实践/Boids算法实践.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}

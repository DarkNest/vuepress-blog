import comp from "E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/miku.png\",\"actions\":[{\"text\":\"B站\",\"link\":\"https://space.bilibili.com/18889387\",\"type\":\"secondary\"},{\"text\":\"知乎\",\"link\":\"https://www.zhihu.com/people/mei-guo-wei-9\",\"type\":\"secondary\"}]},\"headers\":[],\"git\":{\"updatedTime\":1716310854000,\"contributors\":[{\"name\":\"MGW\",\"email\":\"1761699835@qq.com\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")
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

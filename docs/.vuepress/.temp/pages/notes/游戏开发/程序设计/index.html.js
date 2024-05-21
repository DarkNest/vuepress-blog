import comp from "E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏开发/程序设计/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/\",\"title\":\"程序设计\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"notes/游戏开发/程序设计/README.md\"}")
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

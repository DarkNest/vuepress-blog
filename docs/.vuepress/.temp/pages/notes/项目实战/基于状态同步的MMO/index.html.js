import comp from "E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/项目实战/基于状态同步的MMO/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98/%E5%9F%BA%E4%BA%8E%E7%8A%B6%E6%80%81%E5%90%8C%E6%AD%A5%E7%9A%84MMO/\",\"title\":\"基于状态同步的MMO\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"notes/项目实战/基于状态同步的MMO/README.md\"}")
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

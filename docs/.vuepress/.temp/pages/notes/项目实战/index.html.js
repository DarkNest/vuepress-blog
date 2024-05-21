import comp from "E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/项目实战/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98/\",\"title\":\"项目实战\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"notes/项目实战/README.md\"}")
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

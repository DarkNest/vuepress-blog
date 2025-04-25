import comp from "E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/项目实战/基于帧同步的MOBA/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98/%E5%9F%BA%E4%BA%8E%E5%B8%A7%E5%90%8C%E6%AD%A5%E7%9A%84MOBA/\",\"title\":\"基于帧同步的MOBA\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1716310854000,\"contributors\":[{\"name\":\"MGW\",\"email\":\"1761699835@qq.com\",\"commits\":1}]},\"filePathRelative\":\"notes/项目实战/基于帧同步的MOBA/README.md\"}")
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

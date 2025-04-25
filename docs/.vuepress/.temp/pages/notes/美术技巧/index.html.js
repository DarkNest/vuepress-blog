import comp from "E:/VuePress/vuepress-blog/docs/.vuepress/.temp/pages/notes/美术技巧/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E7%BE%8E%E6%9C%AF%E6%8A%80%E5%B7%A7/\",\"title\":\"网络\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"notes/美术技巧/README.md\"}")
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

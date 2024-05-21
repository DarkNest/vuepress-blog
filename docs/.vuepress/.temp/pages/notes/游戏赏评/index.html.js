import comp from "E:/VuePress/blogweb/docs/.vuepress/.temp/pages/notes/游戏赏评/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E6%B8%B8%E6%88%8F%E8%B5%8F%E8%AF%84/\",\"title\":\"游戏赏评\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"notes/游戏赏评/README.md\"}")
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

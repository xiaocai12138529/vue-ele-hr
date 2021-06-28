import pageTool from '@/components/PageTool'

const myPageTool = {
  install(Vue) {
    Vue.component(pageTool.name, pageTool)
  }
}

export default myPageTool

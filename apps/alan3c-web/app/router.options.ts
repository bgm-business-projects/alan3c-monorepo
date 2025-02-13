import type { RouterOptions } from '@nuxt/schema'

// 自定義滾動行為
export default <RouterOptions>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // 返回之前的滾動位置
    }
    else if (to.hash) {
      const element = document.querySelector(to.hash) // 找到目標元素
      if (element) {
        const offset = 90 // 設置偏移量
        const top = element.getBoundingClientRect().top + window.scrollY - offset
        return { top, behavior: 'smooth' } // 平滑滾動
      }
      return false // 如果未找到元素，則不滾動
    }
    else {
      return { top: 0, left: 0 } // 默認滾動到頂部
    }
  },
}

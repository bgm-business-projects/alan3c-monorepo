import { mergeConfigs } from '@unocss/core'
import config from './.nuxt/uno.config.mjs'
import { transformerDirectives } from 'unocss'

const DIRECTION_MAPPINGS: { [key: string]: string } = { t: 'top', r: 'right', b: 'bottom', l: 'left' }

// 顏色查找函數
const resolveColor = (theme: any, color: string): string => {
  const keys = color.split('-')
  let current = theme.colors
  for (const key of keys) {
    if (current[key]) {
      current = current[key]
    } else {
      return color // 如果未找到，返回原始顏色
    }
  }
  return typeof current === 'string' ? current : color
}

export default mergeConfigs([config, {
  rules: [
    // 設定邊框顏色和預設樣式
    [
      /^b(t|r|b|l)?-(.*)/,
      ([, d, c], { theme }) => {
        const direction = d ? DIRECTION_MAPPINGS[d] || '' : ''
        const p = direction ? `border-${direction}` : 'border'
        const resolvedColor = resolveColor(theme, c)
        return {
          [p]: `1px solid ${resolvedColor}`,
        }
      },
    ],
    // 設定邊框樣式和寬度
    [
      /^b(t|r|b|l)?-(\d+px|solid|dotted|dashed|double|groove|ridge|inset|outset)$/,
      ([, d, s]) => {
        const direction = d ? DIRECTION_MAPPINGS[d] || '' : ''
        const p = direction ? `border-${direction}` : 'border'
        if (/^\d/.test(s)) {
          return {
            [`${p}-width`]: s,
          }
        } else {
          return {
            [`${p}-style`]: s,
          }
        }
      },
    ],
    [
      'max-width',{
        'width': '100%',
        'max-width': '80rem'
      }
    ],
    [
      'layout-padding', {
        'padding-left': '5%',
        'padding-right': '5%'
      }
    ],
    [
      'flex-center', {
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      }
    ],
  ],
  theme: {
    colors: {
      primary: {
        red: '#7A0D0D',
        white: '#fff',
        orange: '#FF7A00'
      },
      light: {
        gray: '#EAEAEA',
        red: '#EBE9E9'
      },
      highlight: {
        yellow: '#FFF6EB'
      },
      dark: {
        gray: '#6F6F6F',
        red: '#5B1A1A'
      }
    },
    extend: {
    }
  },
  transformers: [
    // @ts-expect-error    
    transformerDirectives()
  ]
  // your overrides
}])
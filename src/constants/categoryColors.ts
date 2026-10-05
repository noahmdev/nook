export const categoryColors = {
  technology: {
    background: 'bg-tag-tech-bg',
    textColor: 'text-tag-tech-fg',
  },
  design: {
    background: 'bg-tag-design-bg',
    textColor: 'text-tag-design-fg',
  },
  science: {
    background: 'bg-tag-science-bg',
    textColor: 'text-tag-science-fg',
  },
  culture: {
    background: 'bg-tag-culture-bg',
    textColor: 'text-tag-culture-fg',
  },
  health: {
    background: 'bg-tag-health-bg',
    textColor: 'text-tag-health-fg',
  },
  business: {
    background: 'bg-tag-business-bg',
    textColor: 'text-tag-business-fg',
  },
} as const

export type ArticleCategory = keyof typeof categoryColors

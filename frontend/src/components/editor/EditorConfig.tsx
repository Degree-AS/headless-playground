import { Config } from '@measured/puck'
import { HeadingBlockProps, headingBlockConfig } from '../blocks/heading/heading-block'
import { HeroBlockProps, heroBlockConfig } from '../blocks/hero/hero-block'

type EditorProps = {
  HeadingBlock: HeadingBlockProps
  HeroBlock: HeroBlockProps
}

export const editorConfig: Config<EditorProps> = {
  components: {
    HeadingBlock: headingBlockConfig,
    HeroBlock: heroBlockConfig,
  },
  root: {
    fields: {
      title: {
        type: 'text',
        label: 'Page Title',
      },
      slug: {
        type: 'text',
        label: 'URL Slug',
      },
      metaDescription: {
        type: 'textarea',
        label: 'Meta Description',
      },
      metaKeywords: {
        type: 'text',
        label: 'Meta Keywords (comma-separated)',
      },
    },
    render: ({ children }) => children,
  },
}

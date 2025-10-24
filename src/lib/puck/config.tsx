import type { Config } from '@measured/puck'

type Props = {
  Title: {
    text: string
    level: 'h1' | 'h2' | 'h3'
    align: 'left' | 'center' | 'right'
  }
  // HeroBlock: {
  //   title: string
  //   subtitle: string
  // }
}

export const puckConfig: Config<Props> = {
  components: {
    Title: {
      fields: {
        text: {
          type: 'text',
          label: 'Text',
        },
        level: {
          type: 'select',
          label: 'Heading Level',
          options: [
            { label: 'H1', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
          ],
        },
        align: {
          type: 'radio',
          label: 'Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: {
        text: 'Heading',
        level: 'h2',
        align: 'left',
      },
      render: ({ text, level, align }) => {
        const Tag = level
        return (
          <Tag
            style={{
              textAlign: align,
              fontSize: level === 'h1' ? '2.5rem' : level === 'h2' ? '2rem' : '1.5rem',
              fontWeight: 'bold',
              margin: '1rem 0',
            }}
          >
            {text}
          </Tag>
        )
      },
    },
    // HeroBlock: {
    //   fields: {
    //     title: {
    //       type: 'text',
    //       label: 'Title',
    //     },
    //     subtitle: {
    //       type: 'textarea',
    //       label: 'Subtitle',
    //     },
    //   },
    //   defaultProps: {
    //     title: 'Welcome to Our Platform',
    //     subtitle: 'Build amazing experiences with ease',
    //   },
    //   render: ({ title, subtitle }) => {
    //     return (
    //       <div
    //         style={{
    //           padding: '4rem 2rem',
    //           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    //           color: 'white',
    //           textAlign: 'center',
    //           borderRadius: '8px',
    //           margin: '1rem 0',
    //         }}
    //       >
    //         <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h1>
    //         <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>{subtitle}</p>
    //       </div>
    //     )
    //   },
    // },
  },
  root: {
    render: ({ children }) => {
      return <div style={{ padding: '2rem', minHeight: '100vh' }}>{children}</div>
    },
  },
}

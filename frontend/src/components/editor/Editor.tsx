'use client'
import { Puck, type Config } from '@measured/puck'
import '@measured/puck/puck.css'
import { PageSelector } from './fields/page-selector'

type Props = {
  HeadingBlock: {
    children: string
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    alignment: 'left' | 'center' | 'right'
    color: string
    fontSize?: string
    fontWeight: 'normal' | 'bold' | 'light'
    marginTop: string
    marginBottom: string
  }
  Hero: {
    title: string
    subtitle: string
    buttonText: string
    buttonLink: string
    alignment: 'left' | 'center' | 'right'
    variant: 'gradient' | 'solid' | 'image'
    backgroundImage?: string
  }
}

// Create Puck component config
const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: 'text',
          label: 'Text',
          contentEditable: true,
        },
        level: {
          type: 'select',
          label: 'Heading Level',
          options: [
            { label: 'H1 - Largest', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
            { label: 'H4', value: 'h4' },
            { label: 'H5', value: 'h5' },
            { label: 'H6 - Smallest', value: 'h6' },
          ],
        },
        alignment: {
          type: 'radio',
          label: 'Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        color: {
          type: 'text',
          label: 'Color (hex, rgb, or name)',
        },
        fontSize: {
          type: 'text',
          label: 'Custom Font Size (e.g., 2.5rem, 40px)',
        },
        fontWeight: {
          type: 'select',
          label: 'Font Weight',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Normal', value: 'normal' },
            { label: 'Bold', value: 'bold' },
          ],
        },
        marginTop: {
          type: 'select',
          label: 'Margin Top',
          options: [
            { label: 'None', value: '0' },
            { label: 'Small', value: '1rem' },
            { label: 'Medium', value: '2rem' },
            { label: 'Large', value: '3rem' },
          ],
        },
        marginBottom: {
          type: 'select',
          label: 'Margin Bottom',
          options: [
            { label: 'None', value: '0' },
            { label: 'Small', value: '1rem' },
            { label: 'Medium', value: '2rem' },
            { label: 'Large', value: '3rem' },
          ],
        },
      },
      defaultProps: {
        children: 'Edit me by clicking!',
        level: 'h2',
        alignment: 'left',
        color: '#000000',
        fontSize: '',
        fontWeight: 'bold',
        marginTop: '1rem',
        marginBottom: '1rem',
      },
      render: ({
        children,
        level,
        alignment,
        color,
        fontSize,
        fontWeight,
        marginTop,
        marginBottom,
      }) => {
        const Tag = level

        const getFontSize = () => {
          if (fontSize) return fontSize
          const sizes = {
            h1: '2.5rem',
            h2: '2rem',
            h3: '1.75rem',
            h4: '1.5rem',
            h5: '1.25rem',
            h6: '1rem',
          }
          return sizes[level]
        }

        const getFontWeight = () => {
          if (fontWeight === 'light') return '300'
          if (fontWeight === 'bold') return '700'
          return '400'
        }

        return (
          <Tag
            style={{
              textAlign: alignment,
              color: color,
              fontSize: getFontSize(),
              fontWeight: getFontWeight(),
              marginTop: marginTop,
              marginBottom: marginBottom,
              lineHeight: '1.3',
            }}
          >
            {children}
          </Tag>
        )
      },
    },
    Hero: {
      fields: {
        title: {
          type: 'text',
          label: 'Title',
          contentEditable: true,
        },
        subtitle: {
          type: 'textarea',
          label: 'Subtitle',
          contentEditable: true,
        },
        buttonText: {
          type: 'text',
          label: 'Button Text',
        },
        buttonLink: {
          type: 'custom',
          render: ({ value, onChange, name }) => (
            <PageSelector value={value || ''} onChangeAction={onChange} name={name} />
          ),
        },
        alignment: {
          type: 'radio',
          label: 'Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        variant: {
          type: 'select',
          label: 'Style Variant',
          options: [
            { label: 'Gradient', value: 'gradient' },
            { label: 'Solid Color', value: 'solid' },
            { label: 'Background Image', value: 'image' },
          ],
        },
        backgroundImage: {
          type: 'text',
          label: 'Background Image URL',
        },
      },
      defaultProps: {
        title: 'Welcome to Our Platform',
        subtitle: 'Build amazing experiences with our powerful tools and intuitive design.',
        buttonText: 'Get Started',
        buttonLink: 'custom',
        alignment: 'center',
        variant: 'gradient',
        backgroundImage: '',
      },
      render: ({
        title,
        subtitle,
        buttonText,
        buttonLink,
        alignment,
        variant,
        backgroundImage,
      }) => {
        const getBackgroundStyle = () => {
          if (variant === 'gradient') {
            return {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }
          }
          if (variant === 'solid') {
            return {
              background: '#1a202c',
              color: 'white',
            }
          }
          if (variant === 'image' && backgroundImage) {
            return {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
            }
          }
          return {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }
        }

        return (
          <div
            style={{
              padding: '5rem 2rem',
              borderRadius: '12px',
              margin: '1rem 0',
              textAlign: alignment,
              ...getBackgroundStyle(),
            }}
          >
            <h1
              style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                lineHeight: '1.2',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '1.5rem',
                marginBottom: '2.5rem',
                opacity: 0.9,
                maxWidth: '800px',
                margin: alignment === 'center' ? '0 auto 2.5rem' : '0 0 2.5rem',
              }}
            >
              {subtitle}
            </p>
            {buttonText && (
              <a
                href={buttonLink}
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#667eea',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {buttonText}
              </a>
            )}
          </div>
        )
      },
    },
  },
  root: {
    render: ({ children }) => {
      return <div>{children}</div>
    },
  },
}

// Describe the initial data
const initialData = {
  content: [],
  root: {},
}

// Render Puck editor
export function Editor() {
  return (
    <Puck
      config={config}
      data={initialData}
      iframe={{ enabled: false }}
      onPublish={(data) => {
        console.log('Published data:', data)
      }}
    />
  )
}

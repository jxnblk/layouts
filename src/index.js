/** @jsx jsx */
import { jsx, Styled, useThemeUI } from 'theme-ui'
import { Fragment } from 'react'
import { Link } from 'gatsby'
import { Global } from '@emotion/core'
import { Helmet } from 'react-helmet'
import get from 'lodash.get'
import pkg from '../package.json'
import { CodeProvider } from './context'
import ModeSelector from './mode-selector'
import ColorButton from './color-button'
import Pagination from './pagination'

export { Editor, Preview } from './editor'

const colorModes = [
  'dark',
  'lite',
  'pink',
]

const NavLink = ({ as: Tag = 'a', ...props }) =>
  <Tag
    {...props}
    sx={{
      variant: 'styles.navlink',
      fontSize: 0,
      px: 3,
      py: 2,
    }}
  />

const Layout = props => {
  const { colorMode, setColorMode, ...context } = useThemeUI()
  let title = [
    get(props, 'pageContext.frontmatter.title'),
    'React Layouts'
  ].filter(Boolean).join(' | ')

  const cycleColorMode = e => {
    const i = colorModes.indexOf(colorMode)
    const n = (i + 1) % colorModes.length
    setColorMode(colorModes[n])
  }

  return (
    <CodeProvider>
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box',
          },
          body: {
            margin: 0,
          }
        }}
      />
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <title>{title}</title>
        <link rel='icon' href='/icon.png' />
        <meta name='description' content={pkg.description} />
        <meta name='twitter:site' content='jxnblk' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:description' content={pkg.description} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:image' content='/card.png' />
      </Helmet>
      <Styled.root
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh)',
        }}>
        <header
          sx={{
            display: 'flex',
            flexDirection: [
              'column',
              'row',
            ],
            alignItems: 'center',
            minHeight: 48,
          }}>
          <Link to='/'
            sx={{
              variant: 'styles.navlink',
              px: 3,
              py: 2,
            }}>
            React Layouts
          </Link>
          <div sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 'auto',
            mr: [ 'auto', 2 ],
          }}>
            <ModeSelector />
            <div sx={{ mx: 1 }} />
            <ColorButton
              mode={colorMode}
              onClick={cycleColorMode}
            />
          </div>
        </header>
        <main sx={{ px: 3, flex: 'auto' }}>
          {props.children}
          <Pagination {...props} />
        </main>
        <footer
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            py: 4,
            bg: 'muted',
          }}>
          <NavLink as={Link}
            to='/about'
            sx={{
              variant: 'styles.navlink',
              px: 3,
            }}>
            About
          </NavLink>
          <NavLink href='https://github.com/jxnblk/layouts'>GitHub</NavLink>
          <NavLink href='https://theme-ui.com'>Theme UI</NavLink>
          <NavLink href='https://rebassjs.org'>Rebass</NavLink>
          <NavLink href='https://emotion.sh'>Emotion</NavLink>
          <div sx={{ mx: 'auto' }} />
          <NavLink href='https://jxnblk.com'>Made by Jxnblk</NavLink>
          <div sx={{ fontSize: 0, mx: 3, my: 2 }}>© 2019 Brent Jackson</div>
        </footer>
      </Styled.root>
    </CodeProvider>
  )
}

export const wrapPageElement = ({ element, props }) =>
  <Layout {...props}>
    {element}
  </Layout>

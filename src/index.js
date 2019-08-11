/** @jsx jsx */
import { jsx, Styled, useThemeUI } from 'theme-ui'
import { Link } from 'gatsby'
import { Global } from '@emotion/core'
import { CodeProvider, SwitchMode } from './code'

const colorModes = [
  'lite',
  'dark',
  // 'pink',
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
      <Styled.root
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <header
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: 48,
            bg: 'muted',
          }}>
          <Link to='/'
            sx={{
              variant: 'styles.navlink',
              px: 3,
              py: 2,
            }}>
            Layouts
          </Link>
          <div sx={{ mx: 'auto' }} />
          <SwitchMode />
          <div sx={{ mx: 2 }} />
          <ColorButton
            mode={colorMode}
            onClick={cycleColorMode}
          />
          <div sx={{ mx: 2 }} />
        </header>
        <main sx={{ px: 3, flex: 'auto' }}>
          {props.children}
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
        </footer>
      </Styled.root>
    </CodeProvider>
  )
}

const ColorButton = ({
  mode,
  ...props
}) =>
  <button
    {...props}
    title='Cycle Color Mode'
    sx={{
      display: 'inline-block',
      appearance: 'none',
      bg: 'transparent',
      color: 'inherit',
      p: 1,
      m: 0,
      border: 0,
      borderRadius: 9999,
      ':hover,:focus': {
        color: 'primary',
        boxShadow: '0 0 0 3px',
        outline: 'none',
      }
    }}>
    <svg
      viewBox='0 0 32 32'
      width='24'
      height='24'
      fill='currentcolor'
      sx={{
        display: 'block',
      }}>
      <circle
        cx='16'
        cy='16'
        r='14'
        fill='none'
        stroke='currentcolor'
        strokeWidth='4'
      />
      <path
        d={`
          M 16 0
          A 16 16 0 0 0 16 32
          z
        `}
      />
    </svg>
  </button>

export const wrapPageElement = ({ element, props }) =>
  <Layout {...props}>
    {element}
  </Layout>

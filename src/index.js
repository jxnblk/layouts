import React from 'react'
import {
  ThemeProvider,
  ComponentProvider,
  useThemeUI,
  Box,
} from './theme-ui'
import theme from './theme'

const Layout = props => {
  const { colorMode, setColorMode, ...context } = useThemeUI()
  return (
    <Box
      sx={{
        variant: 'styles.root',
      }}>
      <button
        onClick={e => {
          setColorMode(colorMode === 'dark' ? 'default' : 'dark')
        }}>
        {colorMode}
      </button>
      {props.children}
    </Box>
  )
}

export const wrapPageElement = ({ element, props }) =>
  <ThemeProvider theme={theme}>
    <ComponentProvider>
      <Layout {...props}>
        {element}
      </Layout>
    </ComponentProvider>
  </ThemeProvider>

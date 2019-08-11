import React from 'react'
import { Styled, useThemeUI, } from 'theme-ui'
import { CodeProvider, SwitchMode } from './code'

const Layout = props => {
  const { colorMode, setColorMode, ...context } = useThemeUI()

  return (
    <CodeProvider>
      <Styled.root>
        <header>
          Layouts
          <button
            onClick={e => {
              setColorMode(colorMode === 'dark' ? 'light' : 'dark')
            }}>
            {colorMode}
          </button>
          <SwitchMode />
        </header>
        {props.children}
      </Styled.root>
    </CodeProvider>
  )
}

export const wrapPageElement = ({ element, props }) =>
  <Layout {...props}>
    {element}
  </Layout>

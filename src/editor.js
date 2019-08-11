/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import {
  LiveProvider,
  LivePreview,
  LiveEditor,
  LiveError,
} from '@jxnblk/react-live'
import * as Rebass from 'rebass'
import { Styled } from 'theme-ui'
import { Box, Flex } from 'rebass'
import copy from 'copy-to-clipboard'
import indent from 'indent-string'
import { useContext } from './context'

const scope = {
  ...Rebass,
  jsx,
}

const formatCode = (code, mode) => {
  switch (mode) {
    case 'theme-ui':
      return [
        '/** @jsx jsx */',
        `import { jsx } from 'theme-ui'`,
        '',
        'export default props =>',
        indent(code, 2),
      ].join('\n')
      break
    case 'emotion':
      return [
        '/** @jsx jsx */',
        `import { jsx } from '@emotion/core'`,
        '',
        'export default props =>',
        indent(code, 2),
      ].join('\n')
      break
    case 'rebass':
    default:
      return [
        `import React from 'react'`,
        `import { Box, Flex } from 'rebass'`,
        '',
        'export default props =>',
        indent(code, 2),
      ].join('\n')
      break
  }
}

const transformCode = mode => src => {
  switch (mode) {
    case 'theme-ui':
    case 'emotion':
      return '/** @jsx jsx */\n' + src
      break
    default:
      return src
  }
}


export const Editor = props => {
  const { mode, xray } = useContext()
  let code = typeof props.component === 'function'
    ? props.component()
    : props.code
  // const [ userCode, setCode ] = React.useState(code)

  const copyCode = e => {
    copy(formatCode(code, mode))
  }

  return (
    <Box mx={-3}>
      <LiveProvider
        transformCode={transformCode(mode)}
        scope={scope}
        code={code}>
        <Box
          sx={{
            fontWeight: 'bold',
            p: 3,
            '*': xray ? {
              outline: t => `1px solid ${t.colors.outline}`,
            } : {}
          }}>
          <LivePreview />
        </Box>
        <Styled.pre
          sx={{
            position: 'relative',
          }}>
          <LiveEditor
            padding={0}
            style={{
              outline: 'none',
            }}
          />
          <button
            onClick={copyCode}
            title='Copy Source Code'
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              m: 3,
              appearance: 'none',
              px: 3,
              py: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: 0,
              fontWeight: 'bold',
              color: 'primary',
              bg: 'background',
              borderRadius: 9999,
              border: 0,
              boxShadow: '0 0 0 2px',
              ':hover,:focus': {
                color: 'background',
                bg: 'primary',
              }
            }}>
            Copy
          </button>
        </Styled.pre>
        <LiveError
          sx={{
            color: 'white',
            bg: 'red',
          }}
        />
      </LiveProvider>
    </Box>
  )
}

export const Preview = props => {
  const { mode, xray } = useContext()
  let code = typeof props.component === 'function'
    ? props.component()
    : props.code

  return (
    <LiveProvider
      transformCode={transformCode(mode)}
      scope={scope}
      code={code}>
      <Box
        sx={{
          fontWeight: 'bold',
          zoom: props.zoom,
          '*': xray ? {
            outline: t => `1px solid ${t.colors.outline}`
          } : {}
        }}>
        <LivePreview />
      </Box>
    </LiveProvider>
  )
}

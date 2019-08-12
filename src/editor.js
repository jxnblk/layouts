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
import get from 'lodash.get'
import { useContext } from './context'

// masonry layout card
const Card = props => {
  const { mode } = useContext()
  const height = get(props, 'sx.height',
    get(props, 'css.height', 128)
  )
  const span = Math.ceil(
    (height + 16) /
    (32 + 16)
  )
  const gridRowEnd = `span ${span}`

  if (mode === 'emotion') {
    return <Box {...props} css={{ ...props.css, gridRowEnd }} />
  }

  return (
    <Box {...props} sx={{ ...props.sx, gridRowEnd }} />
  )
}
Card.displayName = 'Card'

const scope = {
  ...Rebass,
  Card,
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

const gridStyles = {
  backgroundSize: '8px 8px',
  backgroundImage: t => `linear-gradient(0deg, transparent 7px, ${t.colors.grid} 7px),
  linear-gradient(90deg, transparent 7px, ${t.colors.grid} 7px)`,
}

export const Editor = props => {
  const { mode, grid } = useContext()
  let code = typeof props.component === 'function'
    ? props.component()
    : props.code
  // const [ userCode, setCode ] = React.useState(code)

  const copyCode = e => {
    copy(formatCode(code, mode))
  }

  if (mode === 'css-modules') {
    return (
      <Styled.pre>
        {code}
      </Styled.pre>
    )
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
            ...gridStyles,
            '*': {
              outline: t => `1px solid ${t.colors.outline}`,
            },
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
  const { mode } = useContext()
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
          ...gridStyles,
          '*': {
            outline: t => `1px solid ${t.colors.outline}`,
          }
        }}>
        <LivePreview />
      </Box>
    </LiveProvider>
  )
}

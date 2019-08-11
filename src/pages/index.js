/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { Link } from 'gatsby'
import { Preview } from '..'

import Sidebar from '../examples/sidebar'
import TilesByWidth from '../examples/tiles-by-width'
import TilesByColumns from '../examples/tiles-by-columns'
import Container from '../examples/container'
import Stack from '../examples/stack'

const Grid = ({
  width = 320,
  ...props,
}) =>
  <div
    {...props}
    sx={{
      display: 'grid',
      gridGap: 4,
      gridTemplateColumns: `repeat(auto-fit, minmax(${width}px, 1fr))`,
    }}
  />

const Card = ({
  component,
  title,
  href,
  ...props
}) =>
  <Link
    {...props}
    to={href}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      color: 'inherit',
      textDecoration: 'none',
      px: 3,
      pt: 3,
      border: t => `1px solid ${t.colors.outline}`,
      borderRadius: 4,
      ':hover,:focus': {
        bg: 'muted',
        color: 'primary',
      },
      ':focus': {
        variant: 'styles.focused',
      }
    }}>
    <Preview
      zoom={3/4}
      component={component}
    />
    <div
      sx={{
        mt: 'auto',
        py: 2,
        fontWeight: 'bold',
      }}>
      {title}
    </div>
  </Link>


export default props => {
  return (
    <div>
      <Styled.h1
        sx={{
          fontSize: [4, 5, 6, 6],
          mt: 4,
        }}>
        Grab-and-go layouts for React
      </Styled.h1>
      <Styled.p>
        Click on a layout below to see a full-width editable example and to copy the code.
        Use the controls above to switch syntax modes for
        <Styled.a href='https://rebassjs.org'>Rebass</Styled.a>,
        {' '}
        <Styled.a href='https://theme-ui.com'>Theme UI</Styled.a>, or
        {' '}
        <Styled.a href='https://emotion.sh'>Emotion</Styled.a>.
      </Styled.p>
      <Grid
        sx={{
          py: 4,
        }}>
        <Card
          title='Sidebar'
          component={Sidebar}
          href='/sidebar'
        />
        <Card
          title='Tiles by Width'
          component={TilesByWidth}
          href='/tiles-by-width'
        />
        <Card
          title='Tiles by Columns'
          component={TilesByColumns}
          href='/tiles-by-columns'
        />
        <Card
          title='Container'
          component={Container}
          href='/container'
        />
        <Card
          title='Stack'
          component={Stack}
          href='/stack'
        />
      </Grid>
    </div>
  )
}

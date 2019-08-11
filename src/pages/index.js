/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Link } from 'gatsby'
import Sidebar from '../examples/sidebar'
import TilesByWidth from '../examples/tiles-by-width'
import { Preview } from '../code'

const Grid = ({
  width = 256,
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
      </Grid>
    </div>
  )
}

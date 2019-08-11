/** @jsx jsx */
import { jsx, Box } from '../code'

export default () =>
  <Box
    sx={{
      display: 'grid',
      gridGap: 3,
      gridTemplateColumns: [
        'repeat(2, 1fr)',
        'repeat(4, 1fr)',
      ]
    }}>
    <Box>Tile</Box>
    <Box>Tile</Box>
    <Box>Tile</Box>
    <Box>Tile</Box>
    <Box>Tile</Box>
    <Box>Tile</Box>
    <Box>Tile</Box>
    <Box>Tile</Box>
  </Box>

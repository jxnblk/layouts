/** @jsx jsx */
import { jsx, Box } from '../code'

export default () =>
  <Box
    sx={{
      display: 'grid',
      gridGap: 3,
      gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
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

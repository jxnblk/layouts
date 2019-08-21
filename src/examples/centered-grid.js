/** @jsx jsx */
import { jsx, Box } from '../code'

export default () =>
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: `1fr minmax(auto, 768px) 1fr`,
    }}>
    <Box
      sx={{
        gridColumnStart: 2,
        gridColumnEnd: 3,
        px: 3,
        py: 4,
      }}>
      Container
    </Box>
  </Box>

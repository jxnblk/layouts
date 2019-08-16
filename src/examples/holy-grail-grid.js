/** @jsx jsx */
import { jsx, Box } from '../code';

export default () => (
  <Box
    sx={{
      display: 'grid',
      minHeight: '100vh',
      gridTemplateAreas: [
        `"header" "nav" "main" "ads" "footer"`,
        `"header header header" "nav main ads" "footer footer footer"`
      ],
      gridTemplateColumns: ['1fr', '64px 1fr 64px'],
      gridTemplateRows: [
        'min-content min-content 1fr min-content min-content',
        'min-content 1fr min-content'
      ]
    }}
  >
    <Box sx={{ gridArea: 'header' }}>Header</Box>
    <Box sx={{ gridArea: 'main' }}>Main Content</Box>
    <Box sx={{ gridArea: 'nav' }}>Nav</Box>
    <Box sx={{ gridArea: 'ads' }}>Ads</Box>
    <Box sx={{ gridArea: 'footer' }}>Footer</Box>
  </Box>
);

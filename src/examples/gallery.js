/** @jsx jsx */
import { jsx, Box, Flex } from "../code";

export default () => (
  <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
    <Box sx={{
      display: 'grid',
      flex: 1,
      minHeight: '100vh',
      gridTemplateAreas:[
        `"long-box long-box" "left-box right-box" "wide-box wide-box"`,
        `"long-box long-box left-box right-box" "long-box long-box wide-box wide-box"`]
      ,
      gridTemplateColumns: [
        'repeat(2, 1fr)',
        'repeat(4, 1fr)'
      ],
      gridTemplateRows: [
        '2fr 1fr 1fr',
        'none'
      ],
      gridGap: 4,
      margin: 4
    }}>
      <Box sx={{ flex: 1, gridArea: 'long-box' }}>Long Box</Box>
      <Box sx={{ flex: 1, gridArea: 'left-box' }}>Box Left</Box>
      <Box sx={{ flex: 1, gridArea: 'right-box' }}>Box Right</Box>
      <Box sx={{ flex: 1, gridArea: 'wide-box' }}>Wide box</Box>
    </Box>
  </Flex>
);

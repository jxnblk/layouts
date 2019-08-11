/** @jsx jsx */
import { jsx, Box, Card, Flex } from '../code'

export default props =>
  <Box
    sx={{
      display: 'grid',
      gridGap: 3,
      gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))',
      gridAutoRows: 32,
    }}>
    <Card sx={{ height: 256 }}>Card</Card>
    <Card sx={{ height: 128 }}>Card</Card>
    <Card sx={{ height: 320 }}>Card</Card>
    <Card sx={{ height: 256 }}>Card</Card>
    <Card sx={{ height: 96 }}>Card</Card>
    <Card sx={{ height: 96 }}>Card</Card>
    <Card sx={{ height: 192 }}>Card</Card>
    <Card sx={{ height: 128 }}>Card</Card>
    <Card sx={{ height: 160 }}>Card</Card>
  </Box>

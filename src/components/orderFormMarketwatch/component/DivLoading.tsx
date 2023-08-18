import { Box } from '@mui/material'
import { Skeleton } from '@mui/material'
interface Props {
    widthLeft?: string;
    widthRight ? :string;
  }
  
const DivLoading:React.FC<Props> = ({widthLeft,widthRight}:Props) => {
  return (
    <Box sx={{ display: 'flex',padding:"5px 10px" ,justifyContent:'space-between'}}> 
    <Skeleton  animation="wave"  variant="text" sx={{width:widthLeft }} ></Skeleton>
    <Skeleton  animation="wave"  variant="text" sx={{width:widthRight }} ></Skeleton>
  </Box>
  )
}

export default DivLoading
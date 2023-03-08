import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
    message?: string;
}

export default function LoadingComponent({message = 'Loading...'}: Props) {
    return (
        <Backdrop open={true} invisible={true} sx={{bgcolor:"#1D1D1D"}}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh' >
                <CircularProgress size={50} color='primary' />
                <Typography variant='h6' sx={{justifyContent: 'center', position: 'fixed', top: '60%'}}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    )
}
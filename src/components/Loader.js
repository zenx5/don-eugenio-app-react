import { Box, CircularProgress, LinearProgress } from "@mui/material";

export default function Loader({ linear }) {
    return <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '-webkit-fill-available',
        width:'100%',
        marginLeft:'auto',
        marginRight:'auto',
    }}>
        { linear ? <LinearProgress /> : <CircularProgress/> }
    </Box>
}
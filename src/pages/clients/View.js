import { useEffect } from 'react';
import { Box, List, ListItem, ListItemText, ListItemButton, Typography, CircularProgress, Card, CardContent, CardHeader } from '@mui/material'
import { useDispatch, useSelector } from '../../redux/store';
import { getClient } from '../../redux/slices/client';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function ViewClientPage () {
    const { id } = useParams()
    const { client, isLoading } = useSelector( state => state.client )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClient(id))
    }, [dispatch, id]);




    return isLoading ? <Loader /> :<Box sx={styles.container}>
        <Card>
            <CardHeader title={client?.display_name} />
            <CardContent sx={styles.content}>
                <Typography><b>Email:</b> {client?.user_email}</Typography>
                <Typography><b>Fecha de Registro:</b> {client?.user_registered}</Typography>
            </CardContent>
        </Card>
    </Box>
}

const styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'-webkit-fill-available',
        gap:'20px'
    },
    content:{
        display:'flex',
        flexDirection:'column',
        gap:2
    }
}
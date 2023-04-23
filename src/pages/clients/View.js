import { useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardHeader, Stack, Divider, CardActions, Button, CardActionArea } from '@mui/material'
import { useDispatch, useSelector } from '../../redux/store';
import { getClient } from '../../redux/slices/client';
import { useParams } from 'react-router-dom';
import { InputView, Loader } from '../../components';

export default function ViewClientPage () {
    const { id } = useParams()
    const { client, isLoading } = useSelector( state => state.client )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClient(id))
    }, [dispatch, id]);




    return isLoading ? <Loader /> :<Box sx={styles.container}>
        <Card sx={styles.card}>
            <CardHeader sx={styles.header} title={<Typography variant='h5'>{client?.display_name}</Typography>} />
            <CardContent sx={styles.content}>
                <Stack spacing={2}>
                    <InputView label='Email:' value={client?.user_email} />
                    <InputView label='Fecha de Registro:' value={client?.user_registered} />
                </Stack>
                <Divider />
                <Typography variant='h6'>Servicios</Typography>
            </CardContent>
            <CardActions sx={styles.actions}>
                <Button variant='contained'>Volver</Button>
            </CardActions>
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
        gap:'20px',
        backgroundColor:'#00f3'
    },
    card:{
        width:'80%',
        height:'80%',
        boxShadow:'0 0 10px #00f',
        borderRadius:'20px'
    },
    header:{
        pl:5,
        pt:5,
        '& .MuiTypography-root':{
            fontWeight:'bold'
        }
    },
    content:{
        display:'flex',
        flexDirection:'column',
        p:5,
        gap:2
    },
    actions: {
        pl:5
    }
}
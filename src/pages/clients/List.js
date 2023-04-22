import { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, ListItemButton, Typography, ListItemIcon, Button } from '@mui/material'
import { ArrowRight } from '@mui/icons-material'
import { useDispatch, useSelector } from '../../redux/store';
import { getClients } from '../../redux/slices/client';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function ListClientPage () {
    const { clients, isLoading } = useSelector( state => state.client )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getClients())
    }, [dispatch]);

    const handlerClick = (id) => () => {
        navigate(`/${process.env.REACT_APP_ROUTE_CLIENT}/${id}`)
    }

    return <Box sx={styles.container}>
        <Typography variant='h4' sx={styles.title}>Lista de Clientes</Typography>
        {isLoading ? <Loader />:<List sx={styles.list}>
            {clients.map( client => <ListItem divider key={client.ID}>
                <ListItemButton onClick={handlerClick(client.ID)}>
                    <ListItemText primary={client.display_name} secondary={client.user_email}/>
                    <ListItemIcon>
                        <ArrowRight />
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>) }
        </List>}
        <Box sx={styles.actions}>
            <Button variant='contained'>Nuevo Cliente</Button>
        </Box>
    </Box>
}

const styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        gap:1,
        p:5

    },
    title:{
        textAlign:'center',
    },
    list:{
        overflowY:'scroll',
        height:'70vh',
        boxShadow:'0 0 3px',
        marginTop: 4,
        marginBottom: 4
    },
    actions:{
        display:'flex',
        justifyContent:'flex-end'
    }
}
import { createSlice } from "@reduxjs/toolkit";
import ClientService from "../../services/ClientService";

const initialState = {
    isLoading: false,
    error: null,
    client: null,
    clients: [],
    createClient: null
}

const slice = createSlice({
    name:'client',
    initialState,
    reducers:{
        // START LOADING
        startLoading(state) {
            state.isLoading = true
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },

         // SET CREATE PRODUCT
        setCreateClient(state, action) {
            state.createClient = action.payload
        },

        // GET PRODUCTS
        getClientsSuccess(state, action) {
            state.isLoading = false
            state.clients = action.payload
            state.client = null
        },

        // GET PRODUCT
        getClientSuccess(state, action) {
            state.isLoading = false
            state.client = action.payload
            state.clients = []
        },
    }

})

export default slice.reducer

export function getClients(){
    return async (dispatch) => {
        dispatch(slice.actions.startLoading())
        try{
            const response = await ClientService.fetch()
            dispatch(slice.actions.getClientsSuccess(response))
        }catch( error ) {
            dispatch(slice.actions.hasError(error))
        }
    }
}

export function getClient(id){
    return async (dispatch) => {
        dispatch(slice.actions.startLoading())
        try{
            const response = await ClientService.get(id)
            dispatch(slice.actions.getClientSuccess(response))
        }catch( error ) {
            dispatch(slice.actions.hasError(error))
        }
    }
}

export function setClient(data){
    return async (dispatch) => {
        dispatch(slice.actions.startLoading())
        try{
            if( data.id ) {
                await ClientService.update(data.id, data)
            }else{
                await ClientService.post(data)
            }
            dispatch(getClients())
            dispatch(slice.actions.setCreateClient(data))
        }catch( error ) {
            dispatch(slice.actions.hasError(error))
        }
    }
}

export function deleteClient(id){
    return async (dispatch) => {
        dispatch(slice.actions.startLoading())
        try{
            const response = await ClientService.delete(id)
            dispatch(getClients())
            dispatch(slice.actions.setCreateClient(response))
        }catch( error ) {
            dispatch(slice.actions.hasError(error))
        }
    }
}
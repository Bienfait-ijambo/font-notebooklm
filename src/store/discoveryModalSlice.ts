import { createSlice, configureStore } from '@reduxjs/toolkit'

export const discoveryModalSlice= createSlice({
    name: 'noteCreation',
    initialState: {
        modal: false,
  
      
    },
    reducers: {
        toggleDiscoveryModal: state => {

            state.modal=!state.modal
        },
       

    }
})

export const { toggleDiscoveryModal } = discoveryModalSlice.actions


export default discoveryModalSlice.reducer

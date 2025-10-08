import { createSlice, configureStore } from '@reduxjs/toolkit'

export const addSourceSlice= createSlice({
    name: 'noteCreation',
    initialState: {
        modal: false,
    },
    reducers: {
        toggleAddSourceNoteModal: state => {

            state.modal=!state.modal
        },
       

    }
})

export const { toggleAddSourceNoteModal } = addSourceSlice.actions


export default addSourceSlice.reducer

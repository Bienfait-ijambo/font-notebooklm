import { getSingleNote } from '@/api/notes';
import type { NoteType } from '@/types/note-types';
import { createSlice, configureStore, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'


export const fetchSingleNote = createAsyncThunk(
  "notes/singleNote",
  async (id:string) => getSingleNote(id)
);

const singleNoteState = {
  note: {} as NoteType,
  loading: false,
  error: null,
};


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        leftPanelOpen: true,
        rightPanelOpen: true,
        middlePanelDefaultWidth: 50,
        ...singleNoteState
    },
    reducers: {
        addExtraWidth: state => {

            state.middlePanelDefaultWidth += 21
        },
        reduceExtraWidth: state => {

            state.middlePanelDefaultWidth -= 21
        },

        toggleLeftPanel: state => {

            state.leftPanelOpen = !state.leftPanelOpen
        },


        toggleRightPanel: state => {

            state.rightPanelOpen = !state.rightPanelOpen
        },






    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchSingleNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleNote.fulfilled, (state, action: PayloadAction<{note:NoteType}>) => {
        state.note = action.payload.note;
        state.loading = false;
      })
      .addCase(fetchSingleNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      });
  },
})

export const { addExtraWidth, toggleLeftPanel, toggleRightPanel, reduceExtraWidth } = chatSlice.actions



export default chatSlice.reducer
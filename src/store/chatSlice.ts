import { getNoteChats, getQuestionsAndDocOverview, getSingleNote, type chatHistoryType, type questionAndDocOverviewType } from '@/api/notes';
import type { NoteType } from '@/types/note-types';
import { createSlice, configureStore, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'


export const fetchSingleNote = createAsyncThunk(
  "notes/singleNote",
  async (id: string) => getSingleNote(id)
);



export const fetchDocOverviewAndQuestions = createAsyncThunk(
  "doc/overview",
  async (noteId: string) => getQuestionsAndDocOverview(noteId)
);




const singleNoteState = {
  note: {} as NoteType,
  loading: false,
  error: null,
};


const  docOverviewAndQuestionsState= {
  aiResult: {} as questionAndDocOverviewType,
  
};


const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    leftPanelOpen: true,
    rightPanelOpen: true,
    middlePanelDefaultWidth: 50,
    ...singleNoteState,
    ...docOverviewAndQuestionsState,

    payment:{
      modal:false
    }
  },
  reducers: {

      attribNoteVal: (state ,action)=> {

            state.note=action.payload
        },
    
    togglePaymentModal: state => {

      state.payment.modal = !state.payment.modal
    },

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
      .addCase(fetchSingleNote.fulfilled, (state, action: PayloadAction<{ note: NoteType }>) => {
        state.note = action.payload.note;
        state.loading = false;
      })
      .addCase(fetchSingleNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      })



      // doc overview and questions

        builder
      .addCase(fetchDocOverviewAndQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocOverviewAndQuestions.fulfilled, (state, action: PayloadAction<questionAndDocOverviewType >) => {
        state.aiResult = action.payload;
        state.loading = false;
      })
      .addCase(fetchDocOverviewAndQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      })


  },
})

export const { addExtraWidth,attribNoteVal, toggleLeftPanel, toggleRightPanel, reduceExtraWidth,togglePaymentModal } = chatSlice.actions



export default chatSlice.reducer
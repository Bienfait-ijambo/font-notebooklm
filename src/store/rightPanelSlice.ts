import { getSourceResults } from '@/api/notes';
import { createSlice, configureStore, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'



export const fetchNoteSourceResult = createAsyncThunk(
    "notes/sources/result",
    async (noteId: string) => getSourceResults(noteId)
);



const sourceNoteResultState = {
    sources: {} as Array<{ total_source: number, content: string, noteId: string, userId: string }>,
    loading: false,
    error: null,
    sourceModal: { modal: false, title: "", content: "", source_type: "" },
    mindMapModal: { modal: false, title: "", content: "", source_type: "" },
    audioCard: { show: false, title: "", content: "", source_type: "",sourceSectionHeight:100 }
};



export const rightPanelSlice = createSlice({
    name: 'rightPanel',
    initialState: {
        docIds: [] as string[],
        ...sourceNoteResultState


    },
    reducers: {


        closeMindMap: (state) => {
            state.mindMapModal.modal = false

        },

        closeSourceModal: (state) => {
            state.sourceModal.modal = false
            state.sourceModal.title = ''
            state.sourceModal.content = ''
        },

        closeAudioCard: (state) => {
             state.audioCard.sourceSectionHeight+=40
            state.audioCard.show = false
            state.audioCard.title = ''
            state.audioCard.content = ''
           
        },


        showSourceModalContent: (state, action: PayloadAction<{ title: string, content: string, source_type: string }>) => {

            if (action.payload.source_type.includes('mindMap')) {

                state.mindMapModal.content = action.payload?.content
                state.mindMapModal.modal = true
            }
            else if (action.payload.source_type.includes('audio')) {
                 state.audioCard.sourceSectionHeight-=40
                state.audioCard.show = true
                state.audioCard.title = action.payload?.title
                state.audioCard.content = action.payload?.content
                

            }

            else {
                state.sourceModal.modal = true
                state.sourceModal.title = action.payload?.title
                state.sourceModal.content = action.payload?.content
                state.sourceModal.source_type = action.payload?.source_type
            }


        },
        addDocIds: (state, action: PayloadAction<string>) => {
            const exist = state.docIds.includes(action.payload)
            if (exist) {
                const newArray = state.docIds.filter((pushId: string) => pushId !== action.payload)
                state.docIds = newArray

            } else {
                state.docIds.push(action.payload)
            }

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNoteSourceResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNoteSourceResult.fulfilled, (state, action) => {
                state.sources = action.payload.sources;
                state.loading = false;
            })
            .addCase(fetchNoteSourceResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch sources";
            });
    },
})

export const { addDocIds, showSourceModalContent, closeAudioCard, closeSourceModal, closeMindMap } = rightPanelSlice.actions


export default rightPanelSlice.reducer

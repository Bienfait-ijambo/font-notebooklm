import { getNoteChats, type chatHistoryType } from '@/api/notes';
import { createSlice, configureStore, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'



export const fetchChats = createAsyncThunk(
  "chats/history",
  async ({userId,noteId}:{userId:string,noteId:string}) => getNoteChats(userId,noteId)
);

type ChatState = {
  chatHistory: chatHistoryType | null|undefined;
  loading: boolean;
  error: string | null;
};


const chatState :ChatState= {
  chatHistory: null,
  loading: false,
  error: null,
};


const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState: {
 
    ...chatState
  },
  reducers: {
   


    addMessageInChatHistory: (state,action) => {

      if(state.chatHistory){
       state.chatHistory?.chatHistory?.push(action.payload)
      }
   
    },


  },
  extraReducers: (builder) => {
    builder .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action: PayloadAction<chatHistoryType | undefined>) => {
        state.chatHistory = action.payload;
        state.loading = false;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      });
      
  },
})

export const { addMessageInChatHistory} = chatHistorySlice.actions



export default chatHistorySlice.reducer
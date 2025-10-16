import { configureStore } from "@reduxjs/toolkit";
import chatSlice  from './chatSlice'
import { useDispatch } from "react-redux";
import notesSlice from './noteSlice'
import  addSourceSlice  from "./addSourceSlice";
import discoveryModalSlice from './discoveryModalSlice'
import rightPanelSlice from './rightPanelSlice'
import chatHistorySlice from './chatHistorySlice'
export const store = configureStore({
  reducer: {
     chat:chatSlice,
     note:notesSlice,
     addSource:addSourceSlice,
     discoveryModal:discoveryModalSlice,
     rightPanel:rightPanelSlice,
     chatHistory:chatHistorySlice
  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;






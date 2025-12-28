import { getUserCreditAndPaymentMethod } from '@/api/payment';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'



export const fetchUserCreditAndPayment = createAsyncThunk(
  "get-user-credit-and-payment",
  async (userId:string) => getUserCreditAndPaymentMethod(userId)
);



export type CreditMenuStateType={credits:number,paymentType:string|null}
const creditMenuState= {
  result:{
    credits:0,
    paymentType:null
  } as CreditMenuStateType
 ,
 loading:false,
  error: null,
};


const creditMenuSlice = createSlice({
  name: 'creditMenu',
  initialState: {
 
    ...creditMenuState
  },
  reducers: {
   

  },
  extraReducers: (builder) => {
    builder .addCase(fetchUserCreditAndPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCreditAndPayment.fulfilled, (state, action: PayloadAction<{result:CreditMenuStateType}>) => {

        console.log('result : :  ',action.payload)
        state.result = action.payload.result;
                state.loading = false;
      })
      .addCase(fetchUserCreditAndPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      });
      
  },
})

export const { } = creditMenuSlice.actions



export default creditMenuSlice.reducer
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface"

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems:[] }

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>)=>{
            const existingBookingIndex = state.bookItems.findIndex(
                (item) =>
                    item.venue === action.payload.venue &&
                    item.bookDate === action.payload.bookDate
            );
        
            if (existingBookingIndex !== -1) {
                // หากพบการจองเดิมในวันและสถานที่เดียวกัน ให้แทนที่ข้อมูลเดิม
                state.bookItems[existingBookingIndex] = action.payload;
            } else {
                // หากไม่มีการจองเดิม ให้เพิ่มการจองใหม่เข้าไป
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action:PayloadAction<BookingItem>)=>{
            const remainItems = state.bookItems.filter( obj => {
                return ( (obj.nameLastname !== action.payload.nameLastname) 
                || (obj.tel !== action.payload.tel)
                || (obj.venue !== action.payload.venue) 
                || (obj.bookDate !== action.payload.bookDate) )
            })
            state.bookItems = remainItems
        },
    }
})

export const {addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer
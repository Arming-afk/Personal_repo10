"use client"
import { useAppSelector,AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { useSearchParams } from "next/navigation";

export default function Reservationbook() {

    const bookItems = useAppSelector( (state)=> state.bookSlice.bookItems )
    const dispatch = useDispatch<AppDispatch>()

    return(
        <>
        {
            bookItems.length > 0 ? (
                bookItems.map((bookItem)=>(
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-3"
                        key={bookItem.nameLastname}>
                            <div className="text-xl">{bookItem.nameLastname}</div>
                            <div className="text-sm">Tel: {bookItem.tel}</div>
                            <div className="text-sm">Venue: {bookItem.venue}</div>                        
                            <div className="text-md">Date: {bookItem.bookDate}</div>
                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                            text-white shadow-sm" onClick={()=> dispatch(removeBooking(bookItem))}>
                                Remove from BookingList
                            </button>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 mt-5">
                    No Venue Booking
                </div>
            )
        }
        </>
    );
}
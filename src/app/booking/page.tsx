"use client"
import React from "react";
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import DateReserve from "@/components/DateReserve";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// import getUserProfile from "@/libs/getUserProfile";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs , { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interface";
import { addBooking } from "@/redux/features/bookSlice";


export default function Booking() {

    const urlParams = useSearchParams()
    // const vid = urlParams.get('id')
    // const venue = urlParams.get('venue')

    const dispatch = useDispatch<AppDispatch>()

    const makeReservation = () => {
        if (Location && bookDate) {
            const item:BookingItem = {
                nameLastname: nameLastname,
                tel: tel,
                venue: Location,
                bookDate: dayjs(bookDate).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item))
        } 
        // else {
        //     if (vid) {
        //         console.log("vid")
        //     }
        //     if (venue) {
        //         console.log("venue")
        //     }
        //     if (bookDate) {
        //         console.log("bookdate")
        //     }
        // }
    }

    const [bookDate, setBookDate] = useState<Dayjs | null>(null)
    const [nameLastname, setNameLastname] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [Location, setLocation] = useState<string>('The Bloom Pavilion')


    // const session = await getServerSession(authOptions)
    // if (!session || !session.user.token) return null;

    // const profile = await getUserProfile(session.user.token)
    // var createdAt = new Date(profile.data.createdAt)

    return (
        <main>
            {/* <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <div className='text-2xl'>{profile.data.name}</div>
                <table className='table-auto border-separate border-spacing-2'>
                    <tbody>
                        <tr><td>Email</td><td>{profile.data.email}</td></tr>
                        <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                        <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
                    </tbody>
                </table>
            </div> */}
            
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <Typography variant="h4" gutterBottom className="text-center mb-4">
                    Booking Form
                </Typography>
                <form className="space-y-4">
                    <TextField
                    fullWidth
                    variant="standard"
                    label="Name-Lastname"
                    name="Name-Lastname"
                    margin="normal"
                    className="w-full"
                    value={nameLastname}
                    onChange={(e) => setNameLastname(e.target.value)}
                    />
                    <TextField
                    fullWidth
                    variant="standard"
                    label="Contact-Number"
                    name="Contact-Number"
                    margin="normal"
                    className="w-full"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    />
                    <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}}
                        onLocationChange={(value:string)=>{setLocation(value)}}/>
                    <Button 
                    name = "Book Venue"
                    variant="contained" 
                    color="primary" 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    onClick={makeReservation} >
                    Book Venue
                    </Button>
                </form>
            </div>
        </main>
    );
}
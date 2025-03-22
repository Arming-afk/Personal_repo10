'use client'
import Card from "./Card";
import { useReducer,useState,useRef,useEffect } from "react";
import React from "react";
import Link from "next/link";
import getVenues from "@/libs/getVenues";
import {VenueItem , VenueJson} from "../../interface";

export default function CardPanel() {

    const [venueResponse , setVenueResponse] = useState<VenueJson|null>(null);

    useEffect (() => {
        const fetchData = async ()=> {
            const venues = await getVenues()
            setVenueResponse(venues)
        }
        fetchData()
    }, [])

    const countRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const compareReducer = (compareMap: Map<string, number>, action: { type: string; rating: number , actionType: string}) => {
        const newMap = new Map(compareMap);
        
        if (action.actionType === 'remove') {
            newMap.delete(action.type);
        } else if (action.actionType === 'add') {
            newMap.set(action.type, action.rating);
        }

        return newMap;
        
    };

    /**
     * Mock data for Demonstration Only
     */
    const mockCardRepo = [
        {cid:"001",name: "The Bloom Pavilion", image:'/img/bloom.jpg'},
        {cid:"002",name: "Spark Space", image:'/img/sparkspace.jpg'},
        {cid:"003",name: "The Grand Table", image:'/img/grandtable.jpg'}
    ]

    const [compareMap, dispatchCompare] = useReducer(compareReducer, new Map([
        ['The Bloom Pavilion', 0],
        ['Spark Space', 0],
        ['The Grand Table', 0]
    ]));

    return (
        <div>
            <div style={{margin:"20px" , display:"flex", flexDirection:"row"
            , flexWrap : "wrap" , justifyContent:"space-around", 
            alignContent:"space-around" , padding:"10px"}}>
                {
                    venueResponse && venueResponse.data ? (
                        venueResponse.data.map((cardItem: VenueItem) => (
                            <Link href={`/venue/${cardItem._id}`} className="w-1/5" key={cardItem._id}>
                                <Card 
                                    venueName={cardItem.name} 
                                    imgSrc={cardItem.picture}
                                    onCompare={(venue: string, rate: number, actionType: string) => 
                                        dispatchCompare({ type: venue, rating: rate, actionType: 'add' })
                                    } 
                                />
                            </Link>
                        ))
                    ) : (
                        <div>Loading venues...</div>
                    )
                }
            </div>
            <div className="px-[115px] text-3xl font-extrabold pb-[20px]">Venue List with Rating : {compareMap.size}</div>
            { Array.from(compareMap).map( ([venue, rating])=>
            <div key={venue} data-testid={venue} className="px-[130px] text-xl mb-[10px]"
                onClick={()=>dispatchCompare({ type: venue, rating, actionType: 'remove' })}>
                {venue} : {rating}
            </div>)}
        </div>
    );

}
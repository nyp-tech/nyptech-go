"use client"

import { event } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

interface Props {
    events: event[]
}

const PageEvents = ({ events }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              event.club.toLowerCase().includes(searchTerm.toLowerCase());

        const eventDateStr = new Date(event.date).toISOString().split('T')[0]; // Convert Date to YYYY-MM-DD string
        const matchesDate = selectedDate ? eventDateStr === selectedDate : true;

        return matchesSearch && matchesDate;
    });

    return (
        <div className="flex flex-col mx-auto items-center justify-center m-5">
            <div className="flex space-x-4 mb-4">
                <input 
                    type="text" 
                    placeholder="Search events" 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    className="input input-bordered w-full"
                />
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={handleDateChange} 
                    className="input input-bordered"
                />
            </div>
            
            <div className="carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <div className="carousel-item" key={event.id}>
                            <div className="card bg-base-100 w-96 shadow-xl">
                                <figure>
                                    <img src={event.img} alt={event.title} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{event.title}</h2>
                                    <p>{event.location}</p>
                                    <p>{event.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline">{event.club}</div>
                                        <Link href={event.signup} className="btn btn-primary">Sign Up</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No events found.</p>
                )}
            </div>
        </div>
    );
}

export default PageEvents;

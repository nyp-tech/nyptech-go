"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [signup, setSignup] = useState('');
  const [location, setLocation] = useState('');
  const [club, setClub] = useState('');
  const [img, setImg] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, signup, location, club, img, date }),
    });
    router.push('/');
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Signup Link" value={signup} onChange={(e) => setSignup(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Club" value={club} onChange={(e) => setClub(e.target.value)} required />

        <input type="text" placeholder="Image URL" value={img} onChange={(e) => setImg(e.target.value)} required />

        <input type="date" placeholder="Time" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit" className='btn'>Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;

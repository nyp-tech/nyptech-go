"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/lib/uploadthing';

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
    <div className='card'>
      <h1 className='card-title'>Create Event</h1>
      <form onSubmit={handleSubmit} className='card-body'>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className='input'/>
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className='textarea'/>
        <input type="text" placeholder="Signup Link" value={signup} onChange={(e) => setSignup(e.target.value)} required className='input'/>
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required className='input'/>
        <input type="text" placeholder="Club" value={club} onChange={(e) => setClub(e.target.value)} required className='input'/>

        {/* Remove the manual Image URL input field */}
        {/* <input type="text" placeholder="Image URL" value={img} onChange={(e) => setImg(e.target.value)} required className='input'/> */}
        
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              setImg(res[0].url);  // Set the image URL in the img state
              alert("Upload Completed");
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />

        <input type="date" placeholder="Time" value={date} onChange={(e) => setDate(e.target.value)} required className='input'/>
        <button type="submit" className='btn'>Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;

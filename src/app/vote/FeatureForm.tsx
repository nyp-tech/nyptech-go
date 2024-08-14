import {SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';

const FeatureForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const response = await fetch('/api/feature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      setTitle('');
      setDescription('');
      router.refresh();
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Feature Title"
        value={title}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
        required
        className='input'
      />
      <input
        type="text"
        placeholder="Feature Description"
        value={description}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)}
        required
        className='input'
      />
      <button className="btn" type="submit">Submit Feature</button>
    </form>
  );
};

export default FeatureForm;

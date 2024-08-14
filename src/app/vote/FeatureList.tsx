"use client";
import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  _count: {
    votes: number;
  };
  userHasVoted: boolean;
}

const FeatureList = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFeatures = async () => {
      const response = await fetch('/api/feature');
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setFeatures(data);
      } else {
        console.error('API did not return an array:', data);
        setFeatures([]);
      }
    };
  
    fetchFeatures();
  }, []);
  

  const handleVote = async (featureId: string) => {
    const response = await fetch(`/api/feature/${featureId}`, {
      method: 'POST',
    });

    if (response.ok) {
      const fetchFeatures = async () => {
        const response = await fetch('/api/feature');
        const data: Feature[] = await response.json();
        setFeatures(data);
      };

      fetchFeatures();
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredFeatures = features
    .filter(feature => 
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b._count.votes - a._count.votes);

  return (
    <div className="flex flex-col p-5">
      <input 
        type="text" 
        placeholder="Search features" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        className="mb-4 input"
      />
      {filteredFeatures.map((feature) => (
        <div key={feature.id} className="flex flex-col gap-2">
          <h1 className='text-2xl font-bold'>{feature.title}</h1>
          <p>{feature.description}</p>
          <button onClick={() => handleVote(feature.id)} className='btn btn-ghost'>
            {feature.userHasVoted ? "Voted" : <ArrowUp/>}&nbsp;{feature._count.votes}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;

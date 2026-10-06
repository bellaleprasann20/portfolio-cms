import { useState, useEffect } from 'react';

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/skills');
        if (!response.ok) throw new Error('Failed to fetch skills');
        
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError(err.message);
        setSkills([
          { id: 1, name: "React", category: "Frontend", level: 85 },
          { id: 2, name: "Node.js", category: "Backend", level: 80 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};
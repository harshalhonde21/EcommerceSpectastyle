// This component is used to display the total number of visits to the website. It uses the useState and useEffect hooks to fetch the visit count from the server when the component mounts and increment the visit count when the component mounts. It uses the axios library to make HTTP requests to the server.

import { useState, useEffect } from 'react';
import axios from 'axios';

const VisitCount = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const fetchVisitCount = async () => {
      try { 
        // The URL should be updated to match the backend route for fetching the visit count
        const response = await axios.get('https://ecommerce-backend-0wr7.onrender.com/visitcount');
        setCount(response.data.count);
      } catch (error) {
        console.error('Error fetching visit count:', error);
      }
    };

    fetchVisitCount();
  }, []);

  useEffect(() => {
    const incrementVisitCount = async () => {
      try {
        // The URL should be updated to match the backend route for incrementing the visit count
        await axios.post('https://ecommerce-backend-0wr7.onrender.com/visitcount/increment');
        setCount(prevCount => prevCount + 1);
      } catch (error) {
        console.error('Error incrementing visit count:', error);
      }
    };

    incrementVisitCount();
  }, []);

  return (
    <div>
      Users Visits: {count}
    </div>
  );
};

export default VisitCount;

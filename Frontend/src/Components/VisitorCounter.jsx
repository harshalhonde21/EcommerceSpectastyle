import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitorCounter = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        axios.get('/visitorCount')
            .then(response => {
                setCounter(response.data.count);
            })
            .catch(error => {
                console.error('Error fetching visitor count:', error);
            });
    }, []);

    useEffect(() => {
        setCounter(prevCounter => prevCounter + 1);
    }, []);

    return (
        <div>
            <h2>No. of Visitors: {counter}</h2>
        </div>
    );
};

export default VisitorCounter;

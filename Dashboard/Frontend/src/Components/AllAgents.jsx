import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AllAgents.css';

const AllAgents = () => {
  const [agents, setAgents] = useState([]);
  
  useEffect(() => {
    // Fetch re api for all agents
    axios.get('https://ecommerce-backend-0wr7.onrender.com/ecommerce/agent')
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, []);

  return (
    <Fragment>
      <div className="outer-AllAgents">
        <h1 style={{textAlign:'center'}}>All Agents</h1>
        <br />
        <table className='table-allagents'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id}>
                <td>{agent._id}</td>
                <td>{agent.agentName}</td>
                <td>{agent.agentPassword}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default AllAgents;

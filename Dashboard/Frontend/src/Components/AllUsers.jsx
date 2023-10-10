import { Fragment, useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../css/AllUsers.css';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // user re le spectastyle from 
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-0wr7.onrender.com/ecommerce/user'); // Make sure the URL is correct
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Fragment>
      <div className="outer-AllUsers">
        <h1 style={{ textAlign: 'center' }}>All Users Of SpectStyle</h1><br />
      </div>
      <div className="user-list">
        <h2>User List:</h2>
        <table className='table-allusers'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Password</th>
              <th>Email</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>{user._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default AllUsers;

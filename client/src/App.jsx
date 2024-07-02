import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await axios.get('/api/users');
        console.log(res);
        setUsers(res.data);
      } catch (err) {
        console.error('There was an error fetching the users!', err);
      }
    }
    loadUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users', { firstName, lastName });
      setUsers([...users, res.data]);
      setFirstName('');
      setLastName('');
    } catch (err) {
      console.error('There was an error creating the user!', err);
    }
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;

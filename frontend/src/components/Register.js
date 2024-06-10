// C:\Users\locon\Desktop\COde\restaurante\frontend\src\components\Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'mesero'
  });

  const navigate = useNavigate();

  const { username, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('User registered:', res.data);
      navigate('/login');
    } catch (err) {
      console.error('Error registering user:', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={onChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <div>
        <label>Role</label>
        <select name="role" value={role} onChange={onChange}>
          <option value="mesero">Mesero</option>
          <option value="gerente">Gerente</option>
          <option value="cajero">Cajero</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';

const SignUpForm: React.FC<{}> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the page reload
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // User created successfully
        console.log('User created successfully');
      } else {
        const data = await response.json();
        console.error('Signup error:', data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="email" className="mr-2">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} className="border border-gray-300 px-2 py-1 rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="mr-2">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} className="border border-gray-300 px-2 py-1 rounded" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
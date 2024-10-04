import axios from 'axios';
import React, { useState } from 'react';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(''); 
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email: email, 
        password: password,
      });
      console.log('Login successful:', response.data);
     
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || 'Login failed'); 
      } else {
        setErrorMessage('Login failed');
      }
      console.log(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-gray-100">
        <img
          src="sofa_login.jpg"
          alt="Armchair"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center flex-1 p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Sign In</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Your email address
            </label>
            <input
              type="text"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              id="remember-me"
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm leading-5 text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot password?
            </a>
          </div>
        </form>
        <p className="mt-8 text-sm text-gray-600">
          Don't have an account yet?{' '}
          <a
            href="/signup"
            className="font-bold text-green-500 hover:text-green-800"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
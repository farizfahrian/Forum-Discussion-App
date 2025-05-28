import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="mx-auto max-w-md rounded-lg shadow-lg">
      <label htmlFor="name" className="text-neutral-300">Name</label>
      <input type="text" placeholder="Name" value={name} onChange={onNameChange} className="block px-4 py-2 mb-3 w-full rounded-md bg-neutral-800 placeholder-neutral-500 text-neutral-300" />
      <label htmlFor="email" className="text-neutral-300">Email</label>
      <input type="email" placeholder="Email" value={email} onChange={onEmailChange} className="block px-4 py-2 mb-3 w-full rounded-md bg-neutral-800 placeholder-neutral-500 text-neutral-300" />
      <label htmlFor="password" className="text-neutral-300">Password</label>
      <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} className="block px-4 py-2 mb-3 w-full rounded-md bg-neutral-800 placeholder-neutral-500 text-neutral-300" />
      <button className="px-4 py-2 w-full rounded-md bg-neutral-700 text-neutral-300 hover:bg-neutral-600" type="button" onClick={() => register({ name, email, password })}>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired
};

export default RegisterInput;

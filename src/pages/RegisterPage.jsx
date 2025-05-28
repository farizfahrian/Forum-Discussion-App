import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncRegisterUsers } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    const successCallback = () => {
      navigate('/login');
    };
    dispatch(asyncRegisterUsers({ name, email, password, successCallback }));
  };
  return (
    <section className="flex justify-center items-center h-screen bg-neutral-950">
      <div className="px-8 py-6 mx-auto space-y-4 w-full max-w-md rounded-lg bg-neutral-900 text-neutral-50">
        <h1 className="mb-4 text-2xl font-bold">Register Page</h1>
        <RegisterInput register={onRegister} />
        <p className="text-neutral-500">Already have an account? <a href="/login" className="underline text-neutral-50">Login</a></p>
      </div>
    </section>
  );
}

export default RegisterPage;

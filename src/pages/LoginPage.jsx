import React from 'react';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    const successCallback = () => {
      navigate('/');
    };
    dispatch(asyncSetAuthUser({ email, password, successCallback }));
  };

  return (
    <section className="flex justify-center items-center h-screen bg-neutral-950">
      <div className="px-8 py-6 mx-auto space-y-4 w-full max-w-md rounded-lg bg-neutral-900 text-neutral-50">
        <h1 className="mb-4 text-2xl font-bold">Login Page</h1>
        <LoginInput login={onLogin} />
        <p className="text-neutral-500">Don&apos;t have an account? <a href="/register" className="underline text-neutral-50">Register</a></p>
      </div>
    </section>
  );
}

export default LoginPage;

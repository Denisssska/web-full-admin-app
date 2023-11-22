import { zodResolver } from '@hookform/resolvers/zod';

import useId from '@mui/material/utils/useId';

import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { Link, Navigate } from 'react-router-dom';

import './login.scss';

import { Preloader } from '../../components';

import { getCookie } from '../../components/hooks/getCookie';

import { ToasterProvider } from '../../providers/ToasterProvider';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { loginTC, userActions } from '../../store/slices/userReducer';

import { signInSchema, SignInSchemaType } from '../../utils';
//временное решение
if (!getCookie('session')) {
  localStorage.removeItem('persist:root');
}

export const Login = () => {
  const user = useAppSelector(state => state.user.currentUser);
  const actions = useActionCreators({ loginTC, ...userActions });
  useEffect(() => {
    actions.resetNewUser();
  }, []);
  const loading = useAppSelector(state => state.user.loading);

  const id = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(signInSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: SignInSchemaType) => {
    await actions.loginTC(data).then(e => {
      if (e.payload === 'Unauthorized' || e.payload === 'Not Found') {
        toast.error(`Не вышло!`);
      }
    });
  };
  if (user !== null) return <Navigate to="/profile" replace />;
  return (
    <div className="main">
      <div className="login">
        <h1>Login</h1>
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <div className="formItem">
            <label htmlFor={`${id}-email`}>Email</label>
            <input id={`${id}-email`} type="email" placeholder="Email" {...register('email')} />
            {errors[`email`] && (
              <p className="errorMessage" id={`${id}-email`} aria-live="assertive">
                {String(errors.email.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <label htmlFor={`${id}-password`}>Password</label>
            <input id={`${id}-password`} type="password" placeholder="password" {...register('password')} />
            {errors[`password`] && (
              <p className="errorMessage" id={`${id}-password`} aria-live="assertive">
                {String(errors.password.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <button disabled={loading} type="submit">
              Submit
            </button>
          </div>
          <div className="formItem">
            Don&apos;t have an account?
            <Link to={'/signup'}>
              <button className="signup" type="button">
                Sign up
              </button>
            </Link>
          </div>
        </form>
      </div>
      <ToasterProvider />
      <Preloader />
    </div>
  );
};

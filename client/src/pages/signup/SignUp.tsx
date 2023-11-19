import { zodResolver } from '@hookform/resolvers/zod';

import useId from '@mui/material/utils/useId';

import { useForm } from 'react-hook-form';

import { Link, Navigate } from 'react-router-dom';

import '../login/login.scss';

import { Preloader } from '../../components';

import { ToasterProvider } from '../../providers/ToasterProvider';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { signUpTC } from '../../store/slices/userReducer';

import { signupSchema, SignUpSchemaType } from '../../utils';

export const SignUp = () => {
  const actions = useActionCreators({ signUpTC });
  const { newUser, loading } = useAppSelector(state => state.user);

  const id = useId();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<SignUpSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(signupSchema),
    defaultValues: {},
  });
  const onSubmit = async (data: SignUpSchemaType) => {
    await actions.signUpTC(data);
  };
  if (newUser) return <Navigate to="/login" replace />;
  return (
    <div className="main">
      <div className="login">
        <h1>Register</h1>
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <div className="formItem">
            <label htmlFor={`${id}-username`}>User name</label>
            <input
              autoComplete="false"
              id={`${id}-username`}
              type="text"
              placeholder="User name"
              {...register('username')}
            />
            {errors[`username`] && (
              <p className="errorMessage" id={`${id}-username`} aria-live="assertive">
                {String(errors.username.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <label htmlFor={`${id}-email`}>Email</label>
            <input
              autoComplete="false"
              id={`${id}-email`}
              type="text"
              placeholder="Email"
              {...register('email')}
            />
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
            <button disabled type="button">continue with google</button>
            Have an account?
            <Link to={'/login'}>
              <button className="signup" type="button">
                login
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

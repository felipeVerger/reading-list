import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, registerSchema } from '../../constants/auth.schema';
import FileBase from 'react-file-base64';
import Input from '../shared/Input';
import { generateSalt, hashPassword } from '../../utils/function';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { registerUser, userLogin } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const methods = useForm({
    resolver: yupResolver(isLoggedIn ? loginSchema : registerSchema)
  })
  const navigate = useNavigate();

  const onSubmit = () => {
    const { username, email, password } = methods.getValues();
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    if (isLoggedIn) {
      const user = {
        email,
        password
      }
      dispatch(userLogin(user)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate('/')
        } else {
          alert('Something went wrong')
        }
      })
    } else {
      const doc = {
        username,
        email,
        password: hashedPassword,
        image,
        salt
      };
      dispatch(registerUser(doc)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoggedIn(true);
          methods.reset();
        } else {
          alert('Something went wrong')
        }
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="auth-form">
        {!isLoggedIn && (
          <Input
            type="text"
            name="username"
            autoFocus={true}
            label="username"
            error={methods.formState.errors.username?.message}
            isError={Boolean(methods.formState.errors.username)}
          />
        )}
        <Input
          type="email"
          name="email"
          label="email"
          error={methods.formState.errors.email?.message}
          isError={Boolean(methods.formState.errors.email)}
        />
        <Input
          type="password"
          name="password"
          label="password"
          error={methods.formState.errors.password?.message}
          isError={Boolean(methods.formState.errors.password)}
        />
        {!isLoggedIn && (
          <>
            <Input
              type="password"
              name="confirmPassword"
              label="confirm Password"
              error={methods.formState.errors.confirmPassword?.message}
              isError={Boolean(methods.formState.errors.confirmPassword)}
            />
            <FileBase
              type="file"
              multiple={false}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onDone={({ base64 }) => setImage(base64)}
            />
          </>
        )}
        <button className="submit-btn" type="submit">
          {loading ? 'loading...' : 'Submit'}
        </button>
        <p className="text-sm text-slate-500 self-center">
          {!isLoggedIn ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="ml-2 text-base font-medium text-blue-500"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
          >
            {!isLoggedIn ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </form>
    </FormProvider>
  );
}

export default AuthForm
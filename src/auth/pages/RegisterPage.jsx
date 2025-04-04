import { useMemo } from 'react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'Email must contain @'],
  password: [
    (value) => value.length >= 6,
    'Password must be at least 6 characters',
  ],
  displayName: [
    (value) => value.trim().length >= 2,
    'Name is required',
  ],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Register'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid size={12} sx={{ mb: 2 }}>
            <TextField
              type='text'
              label='Name'
              placeholder='John Doe'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid size={12} sx={{ mb: 2 }}>
            <TextField
              type='email'
              label='Email'
              placeholder='email@example.com'
              fullWidth
              autoComplete='off'
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            />
          </Grid>

          <Grid size={12} sx={{ mb: 2 }}>
            <TextField
              type='password'
              label='Password'
              placeholder='********'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container size={12} spacing={2} sx={{ mb: 2 }}>
            <Grid size={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid size={12}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{ padding: 1.5 }}
                disabled={isCheckingAuthentication}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>

          <Grid size={12} container justifyContent='end'>
            <Typography variant='body'>
              Have an account? &nbsp;
              <Link
                component={RouterLink}
                color='inherit'
                to='/auth/login'
              >
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from '../../store/auth/thunks';

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container>
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
            />
          </Grid>

          <Grid container size={12} spacing={2} sx={{ mb: 2 }}>
            <Grid size={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{ padding: 1.5 }}
                disabled={isCheckingAuthentication}
              >
                Login
              </Button>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                onClick={onGoogleSignIn}
                variant='contained'
                fullWidth
                sx={{ padding: 1.5 }}
                disabled={isCheckingAuthentication}
              >
                <GoogleIcon /> &nbsp;
                <Typography variant='button' sx={{ ml: 1 }}>
                  Google
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid size={12} container justifyContent='end'>
            <Typography variant='body'>
              Don't have an account? &nbsp;
              <Link
                component={RouterLink}
                color='inherit'
                to='/auth/register'
              >
                Register
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

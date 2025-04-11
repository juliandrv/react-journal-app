import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';

import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/auth/thunks';

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(
      firebaseAuth,
      async (user) => {
        if (!user) {
          return dispatch(logout());
        }

        const { uid, email, displayName, photoURL } = user;

        dispatch(login({ uid, email, displayName, photoURL }));
        dispatch(startLoadingNotes());
      },
      (error) => {
        console.error('Error checking authentication state:', error);
      }
    );
  }, []);

  return {
    status,
  };
};

import {
  loginWithEmailPassword,
  logoutFirebase,
  registerWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/providers';
import { loadNotes } from '../../helpers/loadNotes';
import { clearNotesLogout, setNotes } from '../journal/journalSlice';

import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerWithEmailPassword({
      email,
      password,
      displayName,
    });

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({
      email,
      password,
    });
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error('User UID does not exist');

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { firebaseDB } from '../../firebase/config';

import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setSaving,
  updateNote,
  setImagesToActiveNote,
  deleteNoteById,
  setNotes,
} from './journalSlice';

import { fileUpload } from '../../helpers/fileUpload';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(
      collection(firebaseDB, `${uid}/journal/notes`)
    );

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const notes = [];
    const collectionRef = collection(
      firebaseDB,
      `${uid}/journal/notes`
    );
    const docs = await getDocs(collectionRef);

    docs.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setNotes(notes));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    if (!files.length) return;

    dispatch(setSaving());

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setImagesToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};

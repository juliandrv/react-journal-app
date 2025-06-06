import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('The UID does not exist');

  const collectionRef = collection(
    firebaseDB,
    `${uid}/journal/notes`
  );
  const docs = await getDocs(collectionRef);
  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  return notes;
};

import { useRef } from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Upload from '@mui/icons-material/Upload';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

import Swal from 'sweetalert2';

import { ImageGallery } from '../components/ImageGallery';

import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import {
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from '../../store/journal/thunks';

export const NoteView = () => {
  const fileInputRef = useRef();

  const dispatch = useDispatch();

  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { title, body, date, onInputChange, formState } =
    useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  }, [date]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this note',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your note has been deleted.',
          'success'
        );
        dispatch(startDeletingNote());
      }
    });
  };

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        title: `${messageSaved}`,
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      });
    }
  }, [messageSaved]);

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid>
        <Typography sx={{ fontSize: 20 }}>{dateString}</Typography>
      </Grid>

      <Grid>
        <input
          ref={fileInputRef}
          type='file'
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />

        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <Upload />
        </IconButton>

        <Button
          onClick={onSaveNote}
          sx={{ padding: 2, fontWeight: 'bold', letterSpacing: 1 }}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>

        <Button
          disabled={isSaving}
          onClick={onDelete}
          sx={{ padding: 2, fontWeight: 'bold', letterSpacing: 1 }}
          color='error'
        >
          <DeleteOutline sx={{ fontSize: 30, mr: 1 }} />
          Delete
        </Button>
      </Grid>

      <Grid container size={12}>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Enter a title'
          label='Title'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='What happened today?'
          label='Description'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};

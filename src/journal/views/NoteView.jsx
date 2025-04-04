import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import TextField from '@mui/material/TextField';

import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
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
        <Typography sx={{ fontSize: 20 }}>
          28 de agosto, 2022
        </Typography>
      </Grid>

      <Grid>
        <Button
          sx={{ padding: 2, fontWeight: 'bold', letterSpacing: 1 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
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
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='What happened today?'
          label='Description'
          minRows={5}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};

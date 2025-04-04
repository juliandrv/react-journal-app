import Grid from '@mui/material/Grid';
import TurnedInNot from '@mui/icons-material/TurnedInNot';
import Typography from '@mui/material/Typography';

export const DefaultView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: 'primary.main',
        borderRadius: 3,
      }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid xs={12}>
        <TurnedInNot sx={{ fontSize: 100, color: 'white' }} />
      </Grid>

      <Grid>
        <Typography variant='h5' color='white'>
          Select or create an entry
        </Typography>
      </Grid>
    </Grid>
  );
};

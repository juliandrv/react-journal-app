import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4,
      }}
    >
      <Grid direction='row' justifyContent='center'>
        <CircularProgress sx={{ color: '#fff' }} />
      </Grid>
    </Grid>
  );
};

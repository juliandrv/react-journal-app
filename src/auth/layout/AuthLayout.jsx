import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const AuthLayout = ({ children, title = '' }) => {
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
      <Grid
        className='box-shadow animate__animated animate__fadeIn animate__faster'
        xs={3}
        sx={{
          width: { md: 500 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant='h5' sx={{ mb: 4 }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};

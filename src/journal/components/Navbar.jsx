import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { startLogout } from '../../store/auth/thunks';

export const Navbar = ({ drawerWidth }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: {
          sm: `calc(100% - ${drawerWidth}px)`,
          ml: { sm: `${drawerWidth}px` },
        },
      }}
    >
      <Toolbar>
        <IconButton
          color='#ffffff'
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined sx={{ color: 'white' }} />
        </IconButton>

        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ width: '100%' }}
        >
          <Typography variant='h6' noWrap component='div'>
            JournalApp
          </Typography>

          <IconButton onClick={onLogout}>
            <LogoutOutlined sx={{ color: 'white' }} />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Navbar drawerWidth={drawerWidth} />

      <Sidebar drawerWidth={drawerWidth} />

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

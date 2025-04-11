import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TurnedInNot from '@mui/icons-material/TurnedInNot';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

import { setActiveNote } from '../../store/journal/journalSlice';

export const SidebarItem = ({
  id,
  title,
  body,
  date,
  imageUrls = [],
}) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }, [title]);

  const newBody = useMemo(() => {
    return body.length > 60 ? body.substring(0, 60) + '...' : body;
  }, [body]);

  const onClickNote = (note) => () => {
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClickNote({ id, title, body, date, imageUrls })}
      >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container direction='column'>
          <Tooltip
            title={title}
            placement='bottom'
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -14],
                    },
                  },
                ],
              },
            }}
          >
            <ListItemText primary={newTitle} />
          </Tooltip>
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

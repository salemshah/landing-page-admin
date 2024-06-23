import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, deleteMessage, updateMessage } from '../redux/actions/messageActions';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  CircularProgress,
  Box
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const MessageDataTable = () => {
  const dispatch = useDispatch();
  const messageState = useSelector(state => state.message);
  const loading = messageState?.loading;

  const [selected, setSelected] = useState([]);
  const [showMore, setShowMore] = useState({});
  const [isActiveStatus, setIsActiveStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = messageState?.messages?.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id, message) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setIsActiveStatus(messageState?.messages?.find((message) => message._id === newSelected[0])?.status);
    setSelected(newSelected);
    if (newSelected?.length > 1) setIsActiveStatus(false);
  };

  const handleDelete = () => {
    selected.forEach((id) => dispatch(deleteMessage(id)));
    setSelected([]);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleShowMoreToggle = (enhancedId, message) => {
    if (message?._id && !message.status) {
      dispatch(updateMessage(message._id));
    }
    setShowMore((prev) => ({
      ...prev,
      [enhancedId]: !prev[enhancedId]
    }));
  };


  return (
    <Paper>
      <Toolbar>
        {selected?.length > 0 && (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {selected?.length} selected
          </Typography>
        )}
        {selected?.length > 0 && (
          <Stack direction="row" spacing={4}>
            {
              messageState?.messages?.length >= 1 && (<Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>)
            }
          </Stack>
        )}
      </Toolbar>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected?.length > 0 && selected?.length < messageState?.messages?.length}
                    checked={messageState?.messages?.length > 0 && selected?.length === messageState?.messages?.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Sujet</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Montre plus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messageState.messages?.map((message) => {
                const isItemSelected = isSelected(message._id);
                const labelId = `enhanced-table-checkbox-${message._id}`;

                return (
                  <React.Fragment key={message._id}>
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell onClick={(event) => handleClick(event, message._id, message)} padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell>
                        {
                          message?.status ?
                            <Chip size="small" label="Lu" color="success" />
                            : <Chip size="small" label="Non lu" color="info" />
                        }
                      </TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>
                        <div dangerouslySetInnerHTML={{ __html: message.subject }} />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }} colSpan={3}>
                        {
                          showMore[labelId] ? (
                            <ArrowCircleUpOutlinedIcon onClick={() => handleShowMoreToggle(labelId, message)} />
                          ) : (
                            <ArrowCircleDownOutlinedIcon onClick={() => handleShowMoreToggle(labelId, message)} />
                          )
                        }
                      </TableCell>
                    </TableRow>
                    {
                      showMore[labelId] && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Grid container spacing={2}>
                              <Grid item lg={3}>
                                <Typography variant="h5" sx={{ mb: 2 }}>Details</Typography>
                                <Typography>Name: {message.name}</Typography>
                                <Typography>Last Name: {message.lastName}</Typography>
                                <Typography>Subject: {message.subject}</Typography>
                                <Typography>Email: {message.email}</Typography>
                                <Typography>IP: {message.ip}</Typography>
                              </Grid>
                              <Grid item lg={9}>
                                <Typography variant="h5" sx={{ mb: 2 }}>Message</Typography>
                                <div dangerouslySetInnerHTML={{ __html: message.message }} />
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      )
                    }
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default MessageDataTable;

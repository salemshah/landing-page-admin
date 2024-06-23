import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAbouts, deleteAbout, selectAboutToEdite, updateStatus } from '../redux/actions/aboutActions';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const AboutDataTable = () => {
  const dispatch = useDispatch();
  const aboutState = useSelector(state => state.about);
  const loading = aboutState?.loading;

  const [selected, setSelected] = useState([]);
  const [showMore, setShowMore] = useState({});
  const [isActiveStatus, setIsActiveStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchAbouts());
  }, [dispatch]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = aboutState?.abouts?.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id, about) => {
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

    setIsActiveStatus(aboutState?.abouts?.find((about) => about._id === newSelected[0])?.status);
    setSelected(newSelected);
    if (newSelected?.length > 1) setIsActiveStatus(false);
  };

  //is delete button active
  const isDeleteActive = !(selected?.length === 1 && isActiveStatus);

  const handleDelete = () => {
    selected.forEach((id) => dispatch(deleteAbout(id)));
    setSelected([]);
  };

  const handleUpdate = () => {
    if (selected.length === 1) {
      const data = aboutState?.abouts?.find((about) => about._id === selected[0]);
      dispatch(selectAboutToEdite(data));
      setSelected([]);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleShowMoreToggle = (id) => {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  function handleUpdateStatus() {
    if (selected.length === 1) {
      dispatch(updateStatus(selected[0]));
      setSelected([]);
    }
  }

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
              aboutState?.abouts?.length > 1 && isDeleteActive && (<Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>)
            }
            {selected?.length === 1 && (
              <>
                <Tooltip title="Update">
                  <IconButton onClick={handleUpdate}>
                    <BorderColorIcon />
                  </IconButton>
                </Tooltip>
                <Button disabled={isActiveStatus} variant="contained" size="small" type="button"
                        onClick={handleUpdateStatus}>
                  Active
                </Button>
              </>
            )}
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
                    indeterminate={selected?.length > 0 && selected?.length < aboutState?.abouts?.length}
                    checked={aboutState?.abouts?.length > 0 && selected?.length === aboutState?.abouts?.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Montre plus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aboutState.abouts?.map((about) => {
                const isItemSelected = isSelected(about._id);
                const labelId = `enhanced-table-checkbox-${about._id}`;

                return (
                  <React.Fragment key={about._id}>
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell onClick={(event) => handleClick(event, about._id, about)} padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell>
                        {
                          about?.status ?
                            <Chip size="small" label="Active" color="success" />
                            : <Chip size="small" label="None" color="error" />
                        }
                      </TableCell>
                      <TableCell><div dangerouslySetInnerHTML={{ __html: about.description }} /></TableCell>
                      <TableCell sx={{ textAlign: 'center' }} colSpan={3}>
                        {
                          showMore[labelId] ? (
                            <ArrowCircleUpOutlinedIcon onClick={() => handleShowMoreToggle(labelId)} />
                          ) : (
                            <ArrowCircleDownOutlinedIcon onClick={() => handleShowMoreToggle(labelId)} />
                          )
                        }
                      </TableCell>
                    </TableRow>
                    {
                      showMore[labelId] && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Grid container spacing={2}>
                              <Grid item lg={9}>
                                <Typography variant="h5">Description</Typography>
                                <div dangerouslySetInnerHTML={{ __html: about.description }} />
                              </Grid>
                              <Grid item lg={3}>
                                <img alt="about" style={{
                                  height: '100%',
                                  width: '100%',
                                  objectFit: 'scale-down',
                                  borderRadius: '10px'
                                }} src={about?.imgUrl} />
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

export default AboutDataTable;

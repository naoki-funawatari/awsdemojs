import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getResourcesAsync } from '../events/resourcesSlice';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  addCell: {
    display: 'flex',
    flexDirection: 'row',
  },
  addText: {
    flexGrow: 1
  },
  addIcon: {
    flexShrink: 1
  },
  svg: {
    marginTop: 18
  }
}));
const own = 1;

export default () => {
  const { resources } = useSelector(state => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResourcesAsync());
  }, [dispatch]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>Resources</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.filter(resoruce => resoruce.id !== own).map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.title}</TableCell>
                </TableRow>
              ))}
              <TableRow key="new_resource">
                <TableCell>
                  <div className={classes.addCell}>
                    <div className={classes.addText} >
                      <TextField id="standard-basic" label="New Resource Name" fullWidth />
                    </div>
                    <div className={classes.addIcon}>
                      <AddCircleOutlineOutlinedIcon className={classes.svg} />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

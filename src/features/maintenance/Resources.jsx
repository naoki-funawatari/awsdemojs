import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getResourcesAsync } from '../events/resources';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
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
    <Grid container alignContent="center" spacing={3}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>Resources</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.filter(resoruce => resoruce.id !== own).map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell align="center">{resource.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

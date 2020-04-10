import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { deleteToken, updateToken } from './token';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Copyright from '../../components/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default ({ location }) => {
  const inputId = useRef(null);
  const inputPassword = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const signIn = async (e) => {
    dispatch(deleteToken());
    const id = `${inputId.current.value}`.trim();
    const password = `${inputPassword.current.value}`.trim();

    if (id === '') {
      alert('ID を入力してください。');
      return persist(e);
    }

    if (password === '') {
      alert('PASSWORD を入力してください。');
      return persist(e);
    }

    const res = await fetch('https://naoki-funawatari.tk/api/Token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=password&username=${id}&password=${password}`
    });

    if (res.status === 400) {
      alert('ID または PASSWORD が誤っています。');
      return persist(e);
    }

    if (res.status === 200) {
      const json = await res.json();
      const token = json.access_token;
      dispatch(updateToken(token));
      history.push({ pathname: '/' });
    }
  }
  const persist = e => {
    e.persist();
    return false;
  }
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              id="id"
              name="id"
              label="ID"
              maxLength={7}
              inputRef={inputId}
              defaultValue={"T113001"}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              maxLength={100}
              inputRef={inputPassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/signup" onClick={() => dispatch(deleteToken())}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

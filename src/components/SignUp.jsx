import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { deleteToken } from '../stores/token';
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
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default () => {
  const inputId = useRef(null);
  const inputPassword = useRef(null);
  const inputName = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const signUp = async (e) => {
    dispatch(deleteToken());
    const id = `${inputId.current.value}`.trim();
    const password = `${inputPassword.current.value}`.trim();
    const name = `${inputName.current.value}`.trim();

    if (id === '') {
      alert('ID を入力してください。');
      return persist(e);
    }

    if (password === '') {
      alert('PASSWORD を入力してください。');
      return persist(e);
    }

    if (name === '') {
      alert('NAME を入力してください。');
      return persist(e);
    }

    const res = await fetch('https://localhost:44335/Users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password, name })
    })

    if (res.status === 400) {
      alert('エラーが発生しました。');
      return persist(e);
    }

    if (res.status === 204) {
      alert('登録に成功しました。');
      inputId.current.value = '';
      inputPassword.current.value = '';
      inputName.current.value = '';
      history.push({ pathname: '/signin', state: { id } });
    }
  }
  const persist = e => {
    e.persist();
    return false;
  }
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="ID"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={inputId}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={inputPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Your Name"
                inputRef={inputName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

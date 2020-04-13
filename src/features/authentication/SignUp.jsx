import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { deleteToken } from './tokenSlice';
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
import Copyright from '../../components/Copyright';

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
  const [id, setId] = useState({ value: '', isError: false });
  const [password, setPassword] = useState({ value: '', isError: false });
  const [name, setName] = useState({ value: '', isError: false });
  const [email, setEmail] = useState({ value: '', isError: false });
  const dispatch = useDispatch();
  const history = useHistory();
  const signUp = async (e) => {
    dispatch(deleteToken());
    if (id.value.trim() === '') {
      alert('ID を入力してください。');
      return persist(e);
    }

    if (password.value.trim() === '') {
      alert('PASSWORD を入力してください。');
      return persist(e);
    }

    const res = await fetch('https://naoki-funawatari.tk/api/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id.value,
        password: password.value,
        name: name.value,
        email: email.value
      })
    })

    if (res.status === 400) {
      alert('エラーが発生しました。');
      return persist(e);
    }

    if (res.status === 204) {
      alert('登録に成功しました。');
      history.push({ pathname: '/', state: { id: id.value } });
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
                autoFocus
                id="ID"
                name="ID"
                label="ID"
                maxLength={7}
                value={id.value}
                error={id.isError}
                onChange={e => setId({ value: e.target.value, isError: false })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                name="password"
                type="password"
                label="Password"
                maxLength={100}
                value={password.value}
                error={password.isError}
                onChange={e => setPassword({ value: e.target.value, isError: false })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                name="name"
                label="Your Name"
                maxLength={50}
                value={name.value}
                error={name.isError}
                onChange={e => setName({ value: e.target.value, isError: false })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                type="email"
                label="Mail Address"
                maxLength={100}
                value={email.value}
                error={email.isError}
                onChange={e => setEmail({ value: e.target.value, isError: false })}
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

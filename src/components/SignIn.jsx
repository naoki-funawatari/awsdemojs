import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteToken, updateToken } from '../stores/token';

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

    const res = await fetch('https://localhost:44335/Token', {
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
      history.push({ pathname: '/top' });
    }
  }
  const persist = e => {
    e.persist();
    return false;
  }

  return (
    <div className="signin-form">
      <div className="item1-1">ID</div>
      <div className="item1-2">
        <input type="text" ref={inputId} maxLength={7} defaultValue={(location.state && location.state.id) || 'T113001'} />
      </div>
      <div className="item2-1">PASSWORD</div>
      <div className="item2-2">
        <input type="password" ref={inputPassword} maxLength={50} />
      </div>
      <div className="item3">
        <button type="button" onClick={signIn}>SIGN IN</button>
      </div>
    </div>
  );
}
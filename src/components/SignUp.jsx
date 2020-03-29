import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteToken } from '../stores/token';

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

    const res = await fetch('https://localhost:44335/User', {
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
      history.push({ pathname: '/', state: { id } });
    }
  }
  const persist = e => {
    e.persist();
    return false;
  }

  return (
    <div className="signup-form">
      <div className="item1-1">ID</div>
      <div className="item1-2">
        <input type="text" ref={inputId} maxLength={7} />
      </div>
      <div className="item2-1">PASSWORD</div>
      <div className="item2-2">
        <input type="password" ref={inputPassword} maxLength={50} />
      </div>
      <div className="item3-1">NAME</div>
      <div className="item3-2">
        <input type="text" ref={inputName} maxLength={20} />
      </div>
      <div className="item4">
        <button type="button" onClick={signUp}>SIGN UP</button>
      </div>
    </div>
  );
}
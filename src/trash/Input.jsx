import React, { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { appendPerson, removePerson } from '../stores/users';

export default () => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const handleAppendClicked = () => {
    const name = nameRef.current.value;
    if (`${name}`.trim() === '') {
      alert('名前を入力してください。');
      return;
    }
    dispatch(appendPerson({ name }));
    nameRef.current.value = '';
  }
  const handleRemoveClicked = id => () => dispatch(removePerson({ id }));
  const user = useSelector(state => state.user);
  return (
    <ul className="input-list">
      {user.map(user => {
        return (
          <li key={user.id}>
            {`${user.id}  -  ${user.name}`}
            <button type="button" onClick={handleRemoveClicked(user.id)}>－</button>
          </li>
        );
      })}
      <li>
        <input type="text" size="12" ref={nameRef} />
        <button type="button" onClick={handleAppendClicked}>＋</button>
      </li>
    </ul>
  );
}

import React from 'react';
import { useSelector } from "react-redux";

export default () => {
  const user = useSelector(state => state.user);
  return (
    <ul className="input-list">
      {user.map(user => {
        return (
          <li key={user.id}>
            {`${user.id}  -  ${user.name}`}
          </li>
        );
      })}
    </ul>
  );
}

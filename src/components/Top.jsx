import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from "react-redux";

export default () => {
  const token = useSelector(state => state.token);
  const [user, setUser] = useState({ id: null, name: null });
  const getUserInfo = useCallback(async () => {
    const res = await fetch('https://localhost:44335/User', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (res.status === 200) {
      const json = await res.json();
      setUser(json);
      return;
    }
  }, [token]);
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo])

  return (
    <div className="signin-form">
      <div className="item1-1">ID</div>
      <div className="item1-2">{user.id}</div>
      <div className="item2-1">NAME</div>
      <div className="item2-2">{user.name}</div>
      <div className="item3">
      </div>
    </div>
  );
}

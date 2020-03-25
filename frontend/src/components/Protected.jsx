import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';

export default function Protected() {
  const [user] = useContext(UserContext);
  const [content, setContent] = useState('You need to login');

  useEffect(() => {
    async function fetchProtected() {
      const result = await (
        await fetch('http://localhost:4000/protected', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accesstoken}`
          }
        })
      ).json();
      if (result.data) {
        setContent(result.data);
      }
    }
    fetchProtected();
  }, [user]);
  return <div>{content}</div>;
}

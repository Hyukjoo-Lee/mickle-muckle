import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CheckUserInfo from './CheckUserInfo';

import { useState, useEffect } from 'react';
import axios from 'axios';

export function MyPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get('/user/id')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error.response || error.message));
  }, []);

  const userInfo = users
    ? {
        username: users.username,
        user_id: users.user_id,
        password: users.password,
        email: users.email,
        spending_target: users.spending_target,
        address: users.address,
        created_at: users.created_at,
      }
    : null;

  return (
    <CommonRoot>
      <CommonPageInfo title="마이 페이지" text={<p></p>} />
      <CheckUserInfo {...userInfo} />
    </CommonRoot>
  );
}

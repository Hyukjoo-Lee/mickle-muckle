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
        setUsers(response.data[0]);
      })
      .catch((error) => console.log(error.response || error.message));
  }, []);

  const userInfo = users
    ? {
        userName: users.name,
        userId: users.id,
        originPassword: users.password,
        email: users.email,
        nickname: users.nickname,
        Target_Expenditure_Amout: users.spending_target,
      }
    : null;

  return (
    <CommonRoot>
      <CommonPageInfo title="마이 페이지" text={<p></p>} />
      <CheckUserInfo {...userInfo} />
    </CommonRoot>
  );
}

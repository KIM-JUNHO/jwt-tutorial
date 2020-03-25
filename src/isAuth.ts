const { verify } = require('jsonwebtoken');

export const isAuth = req => {
  const authorization = req.headers['authorization'];
  if (!authorization) throw new Error('You need to login');
  // 'Bearer ksfjeklafjalkehflasehfalskejfalkes'
  const token = authorization.split(' ')[1];
  const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
  return userId;
};

import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

export default function verifyAuth(req, res, next) {
  const tokenBearer = req.headers['authorization'];
  
  let token;

  try {
    token = tokenBearer.split(' ')[1];
  } catch (error) {
    return next(createError(404, 'Token not found'));
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err)
      return next(err);
    req.user = { id: decoded.id };
    next();
  });
}
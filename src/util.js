import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtSecret } from './config';

export function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function checkIfDatesAreToday(a, b) {
  a = new Date(a);
  b = new Date(b);
  const [ad, am, ay] = [a.getDay(), a.getMonth(), a.getYear()];
  const [bd, bm, by] = [b.getDay(), b.getMonth(), b.getYear()];
  return ad == bd && am == bm && ay == by;
}

export function generateJwtToken(payload, expiry) {
  return jwt.sign(payload, jwtSecret, { expiresIn: expiry });
}

export function generateHash(string) {
  return bcrypt.hash(string, 11);
}

export function getOrigIdFromGenerated(gen, model) {
  return model.findOne({ id: gen })
    .select('_id')
    .exec()
    .then(emp => {
      if (emp)
        return emp._id.toHexString();
      return emp;
    });
}
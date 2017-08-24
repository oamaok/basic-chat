import jwt from 'jsonwebtoken';

export function idFromJWT(token, key, algo) {
  try {
    const { id } = jwt.verify(token, key, { algorithms: [algo] });
    return id;
  } catch (err) {
    return null;
  }
}

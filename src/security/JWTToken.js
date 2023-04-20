import jwt from 'jsonwebtoken';
import Token  from './Token';

export default  class extends Token {
  generate(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY );
  }
  decode(accessToken) {
    return jwt.verify(accessToken,  process.env.JWT_SECRET_KEY);
  }
}
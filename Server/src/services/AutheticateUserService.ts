import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw Error('Incorret email/password combination!');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw Error('Incorret email/password combination!');

    delete user.password;
    const { secret, expireIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expireIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;

import User from '../entities/User';

export default {
  registerUser: async (name, email, password, dob, type, { usersRepository, authenticator }) => {
    password = await authenticator.encrypt(password);
    const user = new User(undefined, name, email, password, dob, type);
    return usersRepository.persist(user);
  },
  find: ({ usersRepository }) => {
    return usersRepository.find();
  },
  authenticate: async (email, password, { usersRepository, authenticator, token }) => {
    const users = await usersRepository.find({email: email});
    const result = await authenticator.compare(password, users[0].password);
    if (!result) {
      throw new Error('Bad credentials');
    }
    const newToken = token.generate({ email: email });
    return newToken;
  },
  verify:   async (submittedToken,{usersRepository, token}) => {
    const decoded = await token.decode(submittedToken);
    const user = await usersRepository.find({email:decoded.email});
    if (!user[0]) {
        throw new Error('Bad token');
    }
    return user.email;
}
};
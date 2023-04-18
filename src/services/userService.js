import User from '../entities/User';

export default {
  registerUser: async (name, email, password, dob, type, { usersRepository, authenticator }) => {
    password = await authenticator.encrypt(password);
    const user = new User(undefined, name, email, password, dob, type);
    return usersRepository.persist(user);
  },
  find: ({ usersRepository }) => {
    return usersRepository.find();
  }
};
import InMemoryRepository from '../repositories/InMemoryRepository';
import userSchema from '../validators/userSchema';
import MongoUserRepository from '../repositories/MongoUserRepository';
import Authenticator from '../security/BCryptAuthenticator';

const buildDependencies = () => {
  const dependencies = {
  };

  dependencies.userSchema = userSchema;
  dependencies.authenticator = new Authenticator();

  if (process.env.DATABASE_DIALECT === "in-memory") {
    dependencies.usersRepository = new InMemoryRepository();
  } else if (process.env.DATABASE_DIALECT === "mongo") {
    dependencies.usersRepository = new MongoUserRepository();
  } else if (process.env.DATABASE_DIALECT === "mysql") {
    throw new Error('Add MySQL support');
  } else {
    throw new Error('Add DB Support to project');
  }
  return dependencies;
};

export default buildDependencies;

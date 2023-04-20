import UserRepository from "./UserRepository";
import mongoose from 'mongoose';
import User from '../entities/User';

export default class extends UserRepository {

 

  constructor() {

    super();
    const userSchema = new mongoose.Schema({
        name: String,
        email: {type: String, unique: true, index: true},
        password: String,
        dob: String,
        type: String
    });
    this.model = mongoose.model('User', userSchema);
  }

    async persist(accountEntity) {
    const {firstName, lastName, email, password, dob, type} = accountEntity;
    const result = new this.model({firstName, lastName, email, password, dob,type});
    await result.save();
    accountEntity.id=result.id;
    return accountEntity;
  }

  async find(query) {
    const accounts = await this.model.find(query);
    return accounts.map((result) => {
        return new User(result.id, result.name, result.email, result.password, result.dob, result.type);
    });
}
}
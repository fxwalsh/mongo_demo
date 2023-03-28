import UserRepository from "./UserRepository";

export default class extends UserRepository {

  dataAsArray() {
    return Object.keys(this.data).map(key => this.data[key]);
  }

  constructor() {
    super();
    this.index = 1;
    this.data = {};
  }

  persist(accountEntity) {
    const row = Object.assign({}, accountEntity);
    const rowId = this.index++;
    row.id = rowId;
    this.data[rowId] = row;
    return row;
  }

  find() {
    return Promise.resolve(this.dataAsArray());
  }

}
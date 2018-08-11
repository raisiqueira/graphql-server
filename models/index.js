import Axios from "axios";

/**
 * User Class
 * @author Raí Siqueira
 * @class User
 */
class User {
  constructor() {
    this.api = Axios.create({
      baseURL: process.env.API_URL || `http://localhost:3000`
    });
  }

  /**
   * list method
   * @description returns all users from the api
   * @returns
   * @memberof User
   */
  list() {
    return this.api.get("/users").then(res => res.data);
  }

  /**
   * find method
   * @description returns an user from the api
   * @returns
   * @memberof User
   */
  find(id) {
    return this.api.get(`/users/${id}`).then(res => res.data);
  }

  /**
   * create method
   * @description create a user and insert into api
   * @returns
   * @memberof User
   */
  create(data) {
    data.friends = data.friends ? data.friends.map(id => ({ id })) : [];

    return this.api.post("/users", data).then(res => res.data);
  }
}

export default new User();

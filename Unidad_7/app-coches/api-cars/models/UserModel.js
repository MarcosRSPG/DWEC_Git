class User {
  constructor(name, password, admin, token) {
    this.name = name;
    this.password = password;
    this.admin = admin;
    this.token = token;
  }
}

module.exports = User;

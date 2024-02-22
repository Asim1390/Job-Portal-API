class User {
  constructor({ name, email, password }) {
    this.id = User.incrementId();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static incrementId() {
    if (!this.latestId) {
      this.latestId = 1;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }
}

export default User;

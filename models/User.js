import db from '../config/db.js'

const User = {
  async checkByEmail(email) {
    try {
      return await db.query('SELECT * FROM users WHERE email=$1', [email]);
    } catch (e) {
      console.error('User does not exist: ', e.stack);
      return false;
    }
  },

  async checkByUserName(name) {
    try {
      return await db.query('SELECT * FROM users WHERE name=$1', [name]);
    } catch (e) {
      console.error('User does not exist: ', e.stack);
      return false;
    }
  },

  async registerUser(name, email, password, publicProfile) {
    try {
      return await db.query("INSERT INTO users (name,email,password,public) VALUES($1,$2,$3,$4) RETURNING id", [name, email, password, publicProfile]);
    } catch (e) {
      console.log('Error registering user: ', e.stack);
    }
  },
}

export default User;
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

  async checkByUserName(username) {
    try {
      return await db.query('SELECT * FROM users WHERE name=$1', [username]);
    } catch (e) {
      console.error('User does not exist: ', e.stack);
      return false;
    }
  },

  async registerUser(username, email, password, publicProfile) {
    try {
      return await db.query("INSERT INTO users (name,email,password,public) VALUES($1,$2,$3,$4) RETURNING id", [username, email, password, publicProfile]);
    } catch (e) {
      console.log('Error registering user: ', e.stack);
    }
  },

  async isValidUser(email, password) {
    try {
      await db.query('SELECT * FROM users WHERE email=$1 and password=$2', [email, password]);
      return true;
    } catch (e) {
      console.error('User does not exist: ', e.stack);
      return false;
    }
  },

  async getUserId(email) {
    try {
      const res = await db.query('SELECT id FROM users WHERE email=$1', [email]);
      console.log(res.rows[0].id)
      return res.rows[0].id
    } catch (e) {
      console.error('Error getting user id: ', e.stack);
    }
  },
  async getUserName(email) {
    try {
      const res = await db.query('SELECT name FROM users WHERE email=$1', [email]);
      console.log(res.rows[0].name)
      return res.rows[0].name
    } catch (e) {
      console.error('Error getting user id: ', e.stack);
    }
  }
}

export default User;
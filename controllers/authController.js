import User from "../models/User.js";
import bcrypt from "bcrypt"; // BUNLAR HELPER queryler burda yazılcak model de sınıflar tanımlancak ona atanıp döndürülcek

const saltRounds = 10;

const authController = {
  loadLoginPage(req, res) {
    res.render('login', {selected: 'login'});
  },

  loadRegisterPage(req, res) {
    res.render('login', {selected: 'register'})
  },

  async login(req, res) {
    const {email, password} = req.body;
    const remember = req.body.remember === "on";

    try {
      const result = await User.checkByEmail(email);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashPassword = user.password;

        const passwordMatch = await bcrypt.compare(password, storedHashPassword);
        if (passwordMatch) {
          req.session.userId = user.id;
          if (remember) {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7; //7 days
          } else {
            req.session.cookie.expires = false;
          }
          res.redirect('/');
        } else {
          res.render('login', {loginErr: "Credentials doesn't match", direction: "login"});
        }
      } else {
        res.render('login', {loginErr: "User not found.", direction: "login", selected: "login"});
      }
    } catch (e) {
      console.log(e);
      return res.render('login', {
        error: "An error occurred. Please try again.",
        direction: "login",
        selected: "login"
      });
    }
  },

  async register(req, res) {
    let {username, email, password, passwordAgain, publicProfile} = req.body;
    publicProfile = publicProfile === "on";
    try {
      if (password === passwordAgain && password.length < 6) {
        return res.render('login', {
          registerErr: "Password must be 6 or more characters.",
          selected: "register",
          name: username,
          email: email,
          publicProfile: publicProfile
        })
      }
      if (password !== passwordAgain) {
        return res.render('login', {
          registerErr: "Passwords does not match.", selected: "register", name: username,
          email: email,
          publicProfile: publicProfile
        })
      }

      const checkEmail = await User.checkByEmail(email);
      const checkUserName = await User.checkByUserName(username);

      if (checkEmail.rows.length > 0) {
        return res.render('login', {selected: 'register', registerErr: 'Email already in use.'});
      }
      if (checkUserName.rows.length > 0) {
        return res.render('login', {selected: 'register', registerErr: 'Username already taken.'})
      }

      const hash = await bcrypt.hash(password, saltRounds);
      const result = await User.registerUser(username, email, hash, publicProfile);
      req.session.userId = result.id
      res.redirect("/");

    } catch (e) {
      console.log(e);
      res.render('login', {registerErr: "An error occurred. Please try again.", selected: "register"});
    }
  },

  async logout(req, res) {
    res.clearCookie('rememberMe');
    req.session.destroy((e) => {
      if (e) {
        console.error('Error logging out: ', e.stack);
      }
      res.redirect('/');
    });
  }
}


export default authController;
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import session from "express-session";
import bookRoutes from "./routes/book.js";
import searchRoutes from "./routes/search.js";
import authRoute from "./routes/auth.js"
import navigateRoute from "./routes/navigate.js"

dotenv.config();
const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: false,
    httpOnly: true,
  },
}));

app.use('/books', bookRoutes);
app.use('/', searchRoutes);
app.use('/', authRoute);
app.use('/direct', navigateRoute);


app.get('/', (req, res) => {
  console.log(req.session.userId);
  if (req.session.userId) {
    res.render('home', {userId: req.session.userId});
  } else {
    res.render('home');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
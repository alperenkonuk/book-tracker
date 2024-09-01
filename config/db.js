import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT)
});
db.connect((err) => {
  if(err) {
    console.error('connection error', err.stack);
  }
  else {
    console.log('db connected');
  }
});

export default db
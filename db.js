import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "myuser",
  host: "20.199.49.119",
  database: "mydb",
  password: "mypassword",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;

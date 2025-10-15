import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.render("users", {
      title: "User List",
      users: result.rows,
      length: result.rows.length,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Error fetching users");
  }
});

export const PORT = process.env.PORT || 3000;
export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}
